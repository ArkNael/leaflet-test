import React from "react";
import {FormattedMessage, injectIntl} from "react-intl";

import '@formatjs/intl-numberformat/polyfill-force'
import '@formatjs/intl-numberformat/locale-data/br'

import '@formatjs/intl-datetimeformat/polyfill-force'
import '@formatjs/intl-datetimeformat/add-all-tz'
import '@formatjs/intl-datetimeformat/locale-data/br'

const InjectMassage = props => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage, {
  withRef: false
});
