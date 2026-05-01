import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Know Tomorrow Today.'
  const subtitle = searchParams.get('subtitle') || ''
  const type = searchParams.get('type') || 'default'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#4A1942',
          padding: '60px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: '#C9A84C',
            opacity: 0.08,
            transform: 'translate(100px, -100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: '#C9A84C',
            opacity: 0.05,
            transform: 'translate(-80px, 80px)',
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#C9A84C',
          }}
        />

        {/* Type label */}
        {type !== 'default' && (
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            {type === 'conversation' ? 'Conversation' : type === 'scholar' ? 'Scholar' : ''}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '52px',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: subtitle ? '16px' : '40px',
            maxWidth: '900px',
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>
              Solomon Atah
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Podcast
            </span>
          </div>
          <span style={{ color: '#C9A84C', fontSize: '14px', fontStyle: 'italic' }}>
            Know Tomorrow Today.
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
