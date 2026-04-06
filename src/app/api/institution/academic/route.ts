import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDB';

export async function GET() {
  const structure = db.getAcademicStructure();
  return NextResponse.json(structure);
}

export async function POST(request: Request) {
  try {
    const { action, type, name, orgId = 'org-1' } = await request.json();
    
    if (!name || !type) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    if (action === 'add') {
      if (type === 'department') db.addDepartment(orgId, name);
      else if (type === 'section') db.addSection(orgId, name);
    } else if (action === 'remove') {
      if (type === 'department') db.removeDepartment(orgId, name);
      else if (type === 'section') db.removeSection(orgId, name);
    }

    return NextResponse.json(db.getAcademicStructure(orgId));
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
