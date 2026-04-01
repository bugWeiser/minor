import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDB';

export async function GET() {
  try {
    const events = db.getEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newEvent = db.addEvent(data);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
