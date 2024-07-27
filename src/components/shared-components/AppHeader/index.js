import { css } from '@emotion/react'
import { Breadcrumb } from 'antd'
import IntlMessage from 'components/util-components/IntlMessage'
import { MEDIA_QUERIES } from 'constants/ThemeConstant'
import React from 'react'

const AppHeader = ({ title, items }) => {
  return (
    <div
      css={css`
        align-items: center;
        margin-bottom: 1rem;

        @media ${MEDIA_QUERIES.LAPTOP_ABOVE} {
          display: flex;
        }
      `}
    >
      <h3 className="mb-0 mr-3 font-weight-semibold">
        <IntlMessage id={title} />
      </h3>
      <Breadcrumb items={items} />
    </div>
  );
};

export default AppHeader