import os
import json
import hmac
import hashlib
import base64
import uuid
from datetime import datetime, timezone
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DONATION_TABLE'])

CYBERSOURCE_SECRET = os.environ['CYBERSOURCE_SECRET']
CYBERSOURCE_ACCESS_KEY = os.environ['CYBERSOURCE_ACCESS_KEY']
CYBERSOURCE_PROFILE_ID = os.environ['CYBERSOURCE_PROFILE_ID']
SITE_URL = os.environ.get('SITE_URL', 'https://islam.ky')

def generate_signature(signed_field_names, data):
    signed_data = ",".join(f"{k}={data[k]}" for k in signed_field_names.split(","))
    digest = hmac.new(
        CYBERSOURCE_SECRET.encode('utf-8'),
        msg=signed_data.encode('utf-8'),
        digestmod=hashlib.sha256
    ).digest()
    return base64.b64encode(digest).decode('utf-8')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        amount = body['amount']
        currency = body['currency']
        donor_name = body.get('donor_name', '')
        donor_email = body.get('donor_email', '')

        donation_id = str(uuid.uuid4())
        txn_time = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

        # Fields required by CyberSource
        fields = {
            "access_key": CYBERSOURCE_ACCESS_KEY,
            "profile_id": CYBERSOURCE_PROFILE_ID,
            "transaction_uuid": donation_id,
            "signed_field_names": "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,override_custom_receipt_page,override_custom_cancel_page",
            "unsigned_field_names": "",
            "signed_date_time": txn_time,
            "locale": "en",
            "transaction_type": "sale",
            "reference_number": donation_id,
            "amount": str(amount),
            "currency": currency,
            "override_custom_receipt_page": f"{SITE_URL}/thank-you/",
            "override_custom_cancel_page": f"{SITE_URL}/donate/"
        }

        signature = generate_signature(fields['signed_field_names'], fields)
        fields['signature'] = signature

        # Store record in DynamoDB
        table.put_item(Item={
            "donation_id": donation_id,
            "timestamp": txn_time,
            "amount": float(amount),
            "currency": currency,
            "status": "PENDING",
            "donor_name": donor_name,
            "donor_email": donor_email,
            "cybersource_txn_id": None,
            "raw_payload": {}
        })

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(fields)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
