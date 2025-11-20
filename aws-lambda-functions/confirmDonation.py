import os
import json
import hmac
import hashlib
import base64
from datetime import datetime
import boto3
import urllib.parse
import logging

# Setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DONATION_TABLE'])

CYBERSOURCE_SECRET = os.environ['CYBERSOURCE_SECRET']

# Signature Verification

def verify_signature(signed_field_names, data, received_sig):
    signed_data = ",".join(f"{k}={data[k]}" for k in signed_field_names.split(","))
    digest = hmac.new(
        CYBERSOURCE_SECRET.encode('utf-8'),
        msg=signed_data.encode('utf-8'),
        digestmod=hashlib.sha256
    ).digest()
    calculated_sig = base64.b64encode(digest).decode('utf-8')
    return hmac.compare_digest(received_sig, calculated_sig)

def lambda_handler(event, context):
    try:
        body = event['body']
        logger.info(f"raw event body: {body}")
        logger.info(f"isBase64Encoded: {event.get('isBase64Encoded', False)}")
        
        # API Gateway may base64 encode the body
        if event.get('isBase64Encoded', False):
            body = base64.b64decode(body).decode('utf-8')
            logger.info(f"decoded body: {body}")
        
        # Try to parse as JSON first, fall back to form-urlencoded
        parsed = None
        try:
            # Case 1: JSON data
            parsed = json.loads(body)
            logger.info(f"parsed as JSON: {parsed}")
        except (json.JSONDecodeError, TypeError):
            # Case 2: Form-urlencoded data (what CyberSource sends)
            # Parse: "key=value&key2=value2" -> {'key': ['value'], 'key2': ['value2']}
            qs_body = urllib.parse.parse_qs(body)
            logger.info(f"parsed as form-urlencoded: {qs_body}")
            # Flatten values: {'key': ['value']} -> {'key': 'value'}
            parsed = {k: v[0] for k, v in qs_body.items()}
            logger.info(f"flattened dict: {parsed}")

        signed_fields = parsed['signed_field_names']
        received_sig = parsed['signature']

        logger.info(f"Signed fields: {signed_fields}")
        logger.info(f"Parsed payload: {json.dumps(parsed)}")

        if not verify_signature(signed_fields, parsed, received_sig):
            return {"statusCode": 403, "body": "Invalid signature."}

        donation_id = parsed.get('req_reference_number')
        txn_id = parsed.get('transaction_id')
        decision = parsed.get('decision')
        status = "CONFIRMED" if decision == "ACCEPT" else "FAILED"

        table.update_item(
            Key={"donation_id": donation_id},
            UpdateExpression="SET #s = :s, cybersource_txn_id = :t, raw_payload = :p",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={
                ":s": status,
                ":t": txn_id,
                ":p": parsed
            }
        )

        return {"statusCode": 200, "body": "OK"}

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
