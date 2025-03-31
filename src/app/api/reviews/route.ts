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

export async function POST(request: Request) {
  try {

    const { business_id, rating } = await request.json();

    if (!business_id || !rating) {
      return NextResponse.json(
        { error: 'Business id and rating are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        business_id,
        rating,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('data123', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
    try {
      const { review_id, feedback } = await request.json();
  
      if (!review_id || !feedback) {
        return NextResponse.json(
          { error: 'Review ID and feedback are required' },
          { status: 400 }
        );
      }
  
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .update({ feedback }) // Only updating feedback
        .eq('id', review_id)
        .select()
        .single();
  
      if (error) throw error;
  
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error updating review:', error);
      return NextResponse.json(
        { error: 'Failed to update review' },
        { status: 500 }
      );
    }
  }
  

