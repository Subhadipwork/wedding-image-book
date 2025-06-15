import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';

const ExampleComponent = () => {
  const { supabase } = useSupabase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example query - replace 'your_table' with your actual table name
        const { data, error } = await supabase
          .from('your_table')
          .select('*');
          
        if (error) throw error;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Data from Supabase:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExampleComponent;
