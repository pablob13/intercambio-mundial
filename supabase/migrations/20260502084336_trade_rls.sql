-- Drop existing restrictive update policy if it exists (assuming typical name "Users can update their own stamps")
DROP POLICY IF EXISTS "Users can update their own stamps" ON public.user_stamps;

-- Create a more permissive policy allowing authenticated users to update user_stamps
-- This is necessary for the P2P trading feature where the receiver updates both rows.
CREATE POLICY "Users can update stamps for trading" 
ON public.user_stamps
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
