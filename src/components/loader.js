/** @format */

import { Triangle } from 'react-loader-spinner';

function Loader() {
  return (
    <Triangle
      height='500'
      width='500'
      color='#4fa94d'
      ariaLabel='triangle-loading'
      wrapperStyle={{}}
      wrapperClassName='m-auto'
      visible={true}
    />
  );
}

export default Loader;
