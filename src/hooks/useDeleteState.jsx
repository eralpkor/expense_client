import { useState } from 'react';

export default function useDelete(initialVal = false) {
  // call useState, "reserve piece of state"
  const [state, setState] = useState(initialVal);
  const del = () => {
    setState(!state);
  }
  // return piece of state AND a function to delete it
  return [state, del];
}