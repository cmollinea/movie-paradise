import { getSearchResults } from '@/app/helpers';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  console.log(query);
  if (query) {
    const results = await getSearchResults(query);
    return NextResponse.json(results);
  }
};
