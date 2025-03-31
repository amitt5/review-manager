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
      const { review_id, name, email, phone, feedback, google_clicked } = await request.json();

    //   const { review_id, name, email, phone, feedback } = await request.json();

      if (!review_id) {
        return NextResponse.json(
          { error: 'Review ID is required' },
          { status: 400 }
        );
      }

      // Prepare the update object, which will be updated based on the request data
        const updateData: { [key: string]: any } = {};

        // Add fields to update if they exist
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (feedback) updateData.feedback = feedback;
        if (google_clicked !== undefined) updateData.google_clicked = google_clicked; // Only if google_clicked is provided

        if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
            { error: 'No valid fields provided for update' },
            { status: 400 }
        );
        }

  
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .update(updateData)
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
  

