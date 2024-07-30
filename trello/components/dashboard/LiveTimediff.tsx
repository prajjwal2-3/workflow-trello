import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict, differenceInMilliseconds } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

export default function LiveTimediff({ targetDateTime }: { targetDateTime: Date | string }) {
    const [timeDifference, setTimeDifference] = useState('');

    useEffect(() => {
      const updateTimeDifference = () => {
        const target = new Date(targetDateTime);
        const formattedTimeDifference = formatDistanceToNow(target, { addSuffix: true });
        setTimeDifference(formattedTimeDifference);
      };
  
      const intervalId = setInterval(updateTimeDifference, 1000);
  

      updateTimeDifference();
  
    
      return () => clearInterval(intervalId);
    }, [targetDateTime]);
  
    return (
      <div>
        <h1 className='text-[#797979]'>{timeDifference}</h1>
      </div>
    );
}
