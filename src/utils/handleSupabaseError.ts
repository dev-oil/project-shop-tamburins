export function handleSupabaseError(error: unknown): never {
  if (error && typeof error === 'object' && 'message' in error) {
    throw new Error((error as { message: string }).message);
  }
  throw new Error('오류 발생');
}

// Supabase의 error가 항상 AuthError 타입이더라도 JS 런타임에서는 error가 null, undefined, 또는 다른 형태일 수 있기 때문에, error의 타입이 unknown 또는 불확실할 때 안전하게 방어 코드를 넣어줘야함
