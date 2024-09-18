CREATE OR REPLACE FUNCTION get_user_id_by_email(email TEXT)
RETURNS TABLE (id uuid, status subscription_status)
SECURITY definer
AS $$
BEGIN
  RETURN QUERY SELECT au.id, subscriptions.status FROM auth.users au LEFT JOIN subscriptions on au.id = subscriptions.user_id  WHERE au.email = $1 ORDER BY subscriptions.created desc;
END;
$$ LANGUAGE plpgsql;