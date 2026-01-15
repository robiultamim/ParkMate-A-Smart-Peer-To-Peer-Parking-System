-- Enable RLS on bookings (safe to run multiple times)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
GRANT ALL ON bookings TO authenticated;

-- Drop existing policies to prevent naming conflicts
DROP POLICY IF EXISTS "Drivers can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Drivers can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Drivers can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Owners can view bookings for their spaces" ON bookings;
DROP POLICY IF EXISTS "Owners can update bookings for their spaces" ON bookings;

-- 1. DRIVER POLICIES
-- Allow drivers to create bookings (must set themselves as driver)
CREATE POLICY "Drivers can insert their own bookings"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = driver_id);

-- Allow drivers to view their own bookings
CREATE POLICY "Drivers can view their own bookings"
ON bookings FOR SELECT
USING (auth.uid() = driver_id);

-- Allow drivers to update their own bookings (e.g. cancel)
CREATE POLICY "Drivers can update their own bookings"
ON bookings FOR UPDATE
USING (auth.uid() = driver_id);

-- 2. OWNER POLICIES
-- Allow owners to view bookings for their spaces
CREATE POLICY "Owners can view bookings for their spaces"
ON bookings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM parking_spaces
    WHERE parking_spaces.id = bookings.space_id
    AND parking_spaces.owner_id = auth.uid()
  )
);

-- Allow owners to update bookings for their spaces (approve/reject)
CREATE POLICY "Owners can update bookings for their spaces"
ON bookings FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM parking_spaces
    WHERE parking_spaces.id = bookings.space_id
    AND parking_spaces.owner_id = auth.uid()
  )
);
