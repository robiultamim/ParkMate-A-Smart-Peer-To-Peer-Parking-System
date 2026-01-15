-- update_bookings_table.sql

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  driver_id UUID REFERENCES auth.users(id),
  parking_spot_id UUID REFERENCES parking_spaces(id),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  total_amount DECIMAL,
  status TEXT DEFAULT 'pending',
  vehicle_type TEXT,
  license_plate TEXT,
  payment_status TEXT DEFAULT 'pending'
);

-- If table exists but columns are missing, add them
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'license_plate') THEN
        ALTER TABLE bookings ADD COLUMN license_plate TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'vehicle_type') THEN
        ALTER TABLE bookings ADD COLUMN vehicle_type TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'payment_status') THEN
        ALTER TABLE bookings ADD COLUMN payment_status TEXT DEFAULT 'pending';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'parking_spot_id') THEN
        ALTER TABLE bookings ADD COLUMN parking_spot_id UUID REFERENCES parking_spaces(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'driver_id') THEN
        ALTER TABLE bookings ADD COLUMN driver_id UUID REFERENCES auth.users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'start_time') THEN
        ALTER TABLE bookings ADD COLUMN start_time TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'end_time') THEN
        ALTER TABLE bookings ADD COLUMN end_time TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'total_amount') THEN
        ALTER TABLE bookings ADD COLUMN total_amount DECIMAL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'status') THEN
        ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending';
    END IF;
END $$;
