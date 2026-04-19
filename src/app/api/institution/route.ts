import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDB';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgIdOrSlug = searchParams.get('slug') || searchParams.get('id') || 'org-1';
  
  const config = db.getInstitutionConfig(orgIdOrSlug);
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userRole = request.headers.get('x-user-role');
    const userOrgId = request.headers.get('x-user-org-id');
    const id = data.id || 'org-1';
    
    if (userRole !== 'admin' && userRole !== 'demo') {
       return NextResponse.json({ error: 'Unauthorized Configuration Access' }, { status: 403 });
    }
    if (userOrgId !== id && userRole !== 'demo') {
       return NextResponse.json({ error: 'Tenant Mismatch' }, { status: 403 });
    }

    // Slug Validation (3-50 chars, lowercase, alphanumeric, hyphen only)
    if (data.slug) {
      const isSlugValid = /^[a-z0-9-]{3,50}$/.test(data.slug);
      if (!isSlugValid) {
        return NextResponse.json({ error: 'Slug must be 3-50 chars, alphanumeric/hyphen only (lowercase)' }, { status: 400 });
      }
    }

    // Disclaimer Length (max 500 chars)
    if (data.footerDisclaimer && data.footerDisclaimer.length > 500) {
       return NextResponse.json({ error: 'Disclaimer must be under 500 characters' }, { status: 400 });
    }

    // Color Validation (scaffold for accessibility check)
    if (data.accentColor && !/^#[0-9A-F]{6}$/i.test(data.accentColor)) {
       return NextResponse.json({ error: 'Invalid hex color format' }, { status: 400 });
    }

    const updated = db.updateInstitutionConfig(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
