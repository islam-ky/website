// Wait for CMS to be available
window.addEventListener('DOMContentLoaded', () => {
  // Check if CMS is available
  if (typeof CMS !== 'undefined') {
    initPreviews();
  } else {
    // Wait a bit more and try again
    setTimeout(() => {
      if (typeof CMS !== 'undefined') {
        initPreviews();
      }
    }, 1000);
  }
});

function initPreviews() {
  // Blog Preview Template
  const BlogPreview = CMS.createClass({
    render: function() {
      const entry = this.props.entry;
      const title = entry.getIn(['data', 'title']) || 'Untitled';
      const date = entry.getIn(['data', 'date']);
      const description = entry.getIn(['data', 'description']);
      const author = entry.getIn(['data', 'author']);
      const body = this.props.widgetFor('body');
      
      return CMS.h('div', {
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px'
        }
      },
        CMS.h('article', {},
          CMS.h('header', {
            style: {
              marginBottom: '30px',
              borderBottom: '1px solid #eee',
              paddingBottom: '20px'
            }
          },
            CMS.h('h1', {
              style: {
                fontSize: '2.5rem',
                margin: '0 0 10px 0',
                color: '#2c3e50'
              }
            }, title),
            description && CMS.h('p', {
              style: {
                fontSize: '1.2rem',
                color: '#7f8c8d',
                margin: '10px 0'
              }
            }, description),
            CMS.h('div', {
              style: {
                fontSize: '0.9rem',
                color: '#95a5a6'
              }
            },
              date && CMS.h('time', {}, new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })),
              author && ` • By ${author}`
            )
          ),
          CMS.h('div', {
            style: {
              lineHeight: '1.6',
              color: '#2c3e50'
            }
          }, body || CMS.h('p', {}, 'Start writing your blog post...'))
        )
      );
    }
  });

  // Events Preview Template
  const EventsPreview = CMS.createClass({
    render: function() {
      const entry = this.props.entry;
      const title = entry.getIn(['data', 'title']) || 'Untitled Event';
      const eventDate = entry.getIn(['data', 'eventDate']);
      const eventTime = entry.getIn(['data', 'eventTime']);
      const location = entry.getIn(['data', 'location']);
      const description = entry.getIn(['data', 'description']);
      const featured = entry.getIn(['data', 'featured']);
      const body = this.props.widgetFor('body');
      
      return CMS.h('div', {
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px'
        }
      },
        CMS.h('article', {},
          featured && CMS.h('div', {
            style: {
              background: '#3498db',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold'
            }
          }, '⭐ Featured Event'),
          CMS.h('header', {
            style: {
              marginBottom: '30px',
              borderBottom: '1px solid #eee',
              paddingBottom: '20px'
            }
          },
            CMS.h('h1', {
              style: {
                fontSize: '2.5rem',
                margin: '0 0 10px 0',
                color: '#2c3e50'
              }
            }, title),
            description && CMS.h('p', {
              style: {
                fontSize: '1.2rem',
                color: '#7f8c8d',
                margin: '10px 0'
              }
            }, description),
            CMS.h('div', {
              style: {
                background: '#ecf0f1',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0'
              }
            },
              eventDate && CMS.h('div', { style: { margin: '5px 0' } }, 
                CMS.h('strong', {}, '📅 Date: '), 
                new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              ),
              eventTime && CMS.h('div', { style: { margin: '5px 0' } }, 
                CMS.h('strong', {}, '🕐 Time: '), eventTime
              ),
              location && CMS.h('div', { style: { margin: '5px 0' } }, 
                CMS.h('strong', {}, '📍 Location: '), location
              )
            )
          ),
          CMS.h('div', {
            style: {
              lineHeight: '1.6',
              color: '#2c3e50'
            }
          }, body || CMS.h('p', {}, 'Add event details...'))
        )
      );
    }
  });

  // Announcements Preview Template
  const AnnouncementsPreview = CMS.createClass({
    render: function() {
      const entry = this.props.entry;
      const title = entry.getIn(['data', 'title']) || 'Untitled Announcement';
      const date = entry.getIn(['data', 'date']);
      const description = entry.getIn(['data', 'description']);
      const urgent = entry.getIn(['data', 'urgent']);
      const expiryDate = entry.getIn(['data', 'expiryDate']);
      const body = this.props.widgetFor('body');
      
      return CMS.h('div', {
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px'
        }
      },
        CMS.h('article', {},
          urgent && CMS.h('div', {
            style: {
              background: '#e74c3c',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold'
            }
          }, '🚨 URGENT ANNOUNCEMENT'),
          CMS.h('header', {
            style: {
              marginBottom: '30px',
              borderBottom: '1px solid #eee',
              paddingBottom: '20px'
            }
          },
            CMS.h('h1', {
              style: {
                fontSize: '2.5rem',
                margin: '0 0 10px 0',
                color: '#2c3e50'
              }
            }, title),
            description && CMS.h('p', {
              style: {
                fontSize: '1.2rem',
                color: '#7f8c8d',
                margin: '10px 0'
              }
            }, description),
            CMS.h('div', {
              style: {
                fontSize: '0.9rem',
                color: '#95a5a6'
              }
            },
              date && CMS.h('div', {}, 'Published: ', new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })),
              expiryDate && CMS.h('div', {}, 'Expires: ', new Date(expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
            )
          ),
          CMS.h('div', {
            style: {
              lineHeight: '1.6',
              color: '#2c3e50'
            }
          }, body || CMS.h('p', {}, 'Enter announcement details...'))
        )
      );
    }
  });

  // Register preview templates
  CMS.registerPreviewTemplate('blog', BlogPreview);
  CMS.registerPreviewTemplate('events', EventsPreview);
  CMS.registerPreviewTemplate('announcements', AnnouncementsPreview);
  
  console.log('Preview templates registered successfully!');
}
