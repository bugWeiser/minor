import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDB';

export async function GET() {
  try {
    const notices = db.getNotices();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newNotice = db.addNotice(data);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  
  try {
    db.deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
