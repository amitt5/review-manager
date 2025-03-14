import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_KEY');
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { currentRole } = await request.json();
    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    // Check if user role exists
    const { data: existingRole } = await supabaseAdmin
      .from('user_roles')
      .select()
      .eq('user_id', params.userId)
      .single();

    if (existingRole) {
      // Update existing role
      await supabaseAdmin
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', params.userId);
    } else {
      // Insert new role
      await supabaseAdmin
        .from('user_roles')
        .insert({ user_id: params.userId, role: newRole });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
} 