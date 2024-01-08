import { getSearchResults } from '@/app/helpers';
import { NextResponse } from 'next/server';

const param = 'query';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get(param);
  if (query) {
    const results = await getSearchResults(query);
    return NextResponse.json(results);
  }
};
