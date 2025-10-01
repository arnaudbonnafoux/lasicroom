// src/composants/HelmetWrapper.js
import { Helmet } from 'react-helmet';

function HelmetWrapper({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default HelmetWrapper;
