import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'h3ntyeim', 
  dataset: 'production',       
  apiVersion: '2023-01-01',     
  useCdn: true,                 
});
