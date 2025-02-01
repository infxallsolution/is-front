
import React from 'react';
import AppBreadcrumb from 'components/layout-components/AppBreadcrumb';
import IntlMessage from 'components/util-components/IntlMessage';
import { css } from '@emotion/react';
import { MEDIA_QUERIES } from 'constants/ThemeConstant';

const HeaderCustom = ({ title, display=true }) => {

    return (
		display ? (
			<div
				css={css`
					align-items: center;
					margin-bottom: 1rem;

					@media ${MEDIA_QUERIES.LAPTOP_ABOVE} {
						display: flex;
					}
				`}
			>
				<h3 className="mb-0 font-weight-semibold">
					<IntlMessage id={title??"Home"}/>
				</h3>
				<AppBreadcrumb />
			</div>
		)
		: null
	)

}

export default HeaderCustom