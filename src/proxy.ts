import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
	// TODO: Add route protection logic
	return NextResponse.next();
}