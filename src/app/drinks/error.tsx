'use client';

const error = (error: any) => {
  console.log(error);
  // return (
  //   <div>there was an error ...</div>
  // )
  return (
    <div>{error.error.message}</div>
  )
}

export default error