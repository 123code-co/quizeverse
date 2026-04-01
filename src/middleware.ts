import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// TODO: Add route protection logic
	return NextResponse.next();
}