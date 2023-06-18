import React from 'react';
import DeatilSectionContainer from './DeatilSectionContainer';
import DescriptionIcon from '../icons/DescriptionIcon';

const DetailsMid = ({ description }) => {
  return (
    <DeatilSectionContainer>
      <div className="h-full min-h-40 md:min-h-[225px] p-8 bg-gray_light dark:bg-card_dark rounded-lg shadow-md flex flex-col">
        <div className="flex items-center">
          <DescriptionIcon className="mr-4" />
          <h2 className="text-3xl md:text-4xl">Description</h2>
        </div>
        <div className="mt-8">
          <p className="md:text-lg">{description}</p>
        </div>
      </div>
    </DeatilSectionContainer>
  );
};

export default DetailsMid;


