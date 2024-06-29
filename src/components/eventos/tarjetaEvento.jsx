import React from 'react'
import { createClient } from '@/supabase/server';

async function tarjetaEvento() {
    const supabase = createClient();
    const { data: eventos } = await supabase.from("eventos").select();

    return (
    <div>nose</div>
  )
}

export default tarjetaEvento