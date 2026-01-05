-- Enable RLS on parking_spaces if not already enabled
ALTER TABLE parking_spaces ENABLE ROW LEVEL SECURITY;

-- Policy to allow owners to delete their own spaces
-- Assumes 'owner_id' is the column linking to auth.users.id
CREATE POLICY "Owners can delete their own spaces"
ON parking_spaces
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);
