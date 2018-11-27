angular.module('empatica').config(function ($translateProvider) {

    $translateProvider.translations('en', {
        'APP_HOME': 'Home',
        'APP_LOGIN': 'Login',
        'APP_LOGOUT': 'Logout',
        'APP_PROFILE': 'Your profile',
        'APP_COMPANY': 'Company',
        'APP_CAREERS': 'Careers',
        'APP_COPYRIGHT': '© 2017 Empatica Inc. - ISO 13485 Cert. No. 9124.EPTC - All right reserved',

        'HOME_TITLE': 'Smart technology for people<br>living with epilepsy',
        'HOME_SUBTITLE': 'Comes with a 30-days Free Trial Subscription',
        'HOME_BUY_NOW': 'Buy Now',
        'HOME_DISCOVER': 'Discover Embrace Features',
        'HOME_CONTENT_TITLE': 'Your companion for epilepsy management',
        'HOME_CONTENT_SUBTITLE': 'The Embrace watch uses advanced learning algorithms to identify tonic-clonic seizures and send alerts to caregivers. It also provides sleep, rest, and physical activity analysis.',

        'PROFILE_EMAIL': 'Email',
        'PROFILE_NAME': 'Name',
        'PROFILE_ORDERS': 'Orders',
        'PROFILE_PERSONAL_PROFILE': 'Personal profile',
        'PROFILE_STATUS_PAID': 'Paid',
        'PROFILE_STATUS_IN_TRANSIT': 'In transit',
        'PROFILE_ORDERED_ITEMS': 'Ordered items',
        'PROFILE_DISCOUNTS': 'Discounts',
        'PROFILE_TOTAL': 'Total',
        'PROFILE_TRACKING': 'Tracking',
        'PROFILE_CANCEL_ORDER': 'Cancel order',
        'PROFILE_STATUS': 'Status',
        'PROFILE_TRACKING_CODE': 'Tracking code',
        'PROFILE_CARRIER': 'Carrier'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
});
