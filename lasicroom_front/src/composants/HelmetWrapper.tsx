import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface HelmetWrapperProps {
  title: string;
  description: string;
}

/**
 * 📋 HelmetWrapper
 * Gère le head HTML pour le SEO
 */
const HelmetWrapper: FC<HelmetWrapperProps> = ({
  title,
  description,
}): React.ReactElement => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default HelmetWrapper;
