// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconLifebuoy, IconSettings } from '@tabler/icons';
import { GroupMenuItems } from 'types';

const general: GroupMenuItems = {
    id: 'sample-docs-roadmap-general',
    type: 'group',
    title: 'General',
    children: [
        {
            id: 'settings',
            title: <FormattedMessage id="menu_settings" />,
            type: 'item',
            url: '/settings',
            icon: IconSettings,
            breadcrumbs: false
        },
        {
            id: 'help_center',
            title: <FormattedMessage id="menu_help_center" />,
            type: 'item',
            url: '/help-center',
            icon: IconLifebuoy,
            breadcrumbs: false
        }
    ]
};

export default general;
