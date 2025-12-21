import { NextRequest, NextResponse } from 'next/server';

// Endpoint to check order status by charge ID
// Returns payment status and download URL if confirmed

export async function GET(request: NextRequest) {
  try {
    const chargeId = request.nextUrl.searchParams.get('chargeId');

    if (!chargeId) {
      return NextResponse.json(
        { error: 'chargeId required' },
        { status: 400 }
      );
    }

    // Mock: In production, query Supabase
    // const { data: order, error } = await supabase
    //   .from('orders')
    //   .select('*')
    //   .eq('coinbase_checkout_id', chargeId)
    //   .single();

    const mockOrder = {
      chargeId,
      promptId: '1',
      status: 'confirmed',
      amount: '4.99',
      currency: 'USD',
      paidAt: new Date().toISOString(),
      downloadUrl: `/api/download/${chargeId}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log('[ORDER STATUS] Query for charge:', chargeId, 'Result:', mockOrder.status);

    return NextResponse.json(mockOrder);
  } catch (error) {
    console.error('[ORDER STATUS] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order status' },
      { status: 500 }
    );
  }
}
