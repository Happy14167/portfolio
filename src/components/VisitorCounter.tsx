import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const incrementVisitors = async () => {
      try {
        const { data, error } = await supabase.rpc('increment_visitors');
        if (error) throw error;
        setVisitorCount(data || 0);
      } catch (error) {
        console.error('Error updating visitor count:', error);
        setError('Failed to update visitor count');
      }
    };

    incrementVisitors();
  }, []);

  return (
    <div className="text-center mt-8 p-4 bg-background-light rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Website Statistics</h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-text-secondary">
          Total Visitors: <span className="font-bold text-accent-primary">{visitorCount}</span>
        </p>
      )}
    </div>
  );
};

export default VisitorCounter;