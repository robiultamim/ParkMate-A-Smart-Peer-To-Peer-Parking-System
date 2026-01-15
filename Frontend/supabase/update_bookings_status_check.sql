-- Drop valid constraints if they exist
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

-- Add a new check constraint that matches our application logic
-- status values: 'pending', 'confirmed', 'rejected', 'completed', 'cancelled', 'active'
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
CHECK (status IN ('pending', 'confirmed', 'rejected', 'completed', 'cancelled', 'active'));
