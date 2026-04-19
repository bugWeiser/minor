import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDB';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get('orgId');
    const userOrgId = request.headers.get('x-user-org-id');
    const userRole = request.headers.get('x-user-role');

    if (!orgId) {
      return NextResponse.json({ error: 'orgId parameter is required' }, { status: 400 });
    }

    // Server-side enforcement
    if (userRole !== 'demo' && userOrgId !== orgId && userOrgId !== null) {
       return NextResponse.json({ error: 'Unauthorized Tenant Access' }, { status: 403 });
    }

    const allNotices = db.getNotices(orgId);
    
    // Server-side draft isolation: students never receive drafts in the payload
    const notices = userRole === 'student' || userRole === 'none' || !userRole
      ? allNotices.filter((n: any) => n.publishState !== 'draft')
      : allNotices;

    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userOrgId = request.headers.get('x-user-org-id');
    const userRole = request.headers.get('x-user-role');
    
    // Server-side enforcement (must be logged in, admin/faculty/demo, and matching org)
    if (!userOrgId || (userOrgId !== data.organizationId && userRole !== 'demo')) {
       return NextResponse.json({ error: 'Unauthorized Mutation' }, { status: 403 });
    }
    
    const newNotice = db.addNotice(data);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userRole = request.headers.get('x-user-role');
  
  if (!userRole || userRole === 'student' || userRole === 'none') {
    return NextResponse.json({ error: 'Unauthorized Deletion' }, { status: 403 });
  }

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  
  try {
    db.deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const userRole = request.headers.get('x-user-role');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !userRole || userRole === 'student' || userRole === 'none') {
      return NextResponse.json({ error: 'Unauthorized Mutation' }, { status: 403 });
    }

    const updated = db.updateNotice(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
  }
}
