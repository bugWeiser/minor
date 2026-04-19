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

    if (userRole !== 'demo' && userOrgId !== orgId && userOrgId !== null) {
       return NextResponse.json({ error: 'Unauthorized Tenant Access' }, { status: 403 });
    }

    const allEvents = db.getEvents(orgId);
    
    // Server-side draft isolation: students never receive drafts in the payload
    const events = userRole === 'student' || userRole === 'none' || !userRole
      ? allEvents.filter((n: any) => n.publishState !== 'draft')
      : allEvents;

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userOrgId = request.headers.get('x-user-org-id');
    const userRole = request.headers.get('x-user-role');
    
    if (!userOrgId || (userOrgId !== data.organizationId && userRole !== 'demo')) {
       return NextResponse.json({ error: 'Unauthorized Mutation' }, { status: 403 });
    }

    const newEvent = db.addEvent(data);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
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
    db.deleteEvent(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
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

    const updated = db.updateEvent(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
