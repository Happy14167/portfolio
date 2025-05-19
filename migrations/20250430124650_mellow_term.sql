/*
  # Add increment_visitors function
  
  1. New Functions
    - `increment_visitors()`
      - Updates the visitor count and last visit timestamp
      - Returns the new total count
  
  2. Security
    - Function is accessible to public (anonymous users)
*/

CREATE OR REPLACE FUNCTION public.increment_visitors()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE visitors 
  SET count = count + 1,
      last_visit = now()
  WHERE id = '00000000-0000-0000-0000-000000000000'
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Grant execute permission to public (anonymous users)
GRANT EXECUTE ON FUNCTION public.increment_visitors() TO public;