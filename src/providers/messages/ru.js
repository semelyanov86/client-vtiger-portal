const ruMessages = {
  Dashboards: 'Dashboards',
  latestRegistration: 'Users from your company',
  Tickets: 'Tickets',
  Projects: 'Projects',
  FAQ: 'FAQ',
  products: 'Products',
  services: 'Services',
  'company.name': 'Company Name',
  'company.address': 'Company Address',
  'company.city': 'City',
  'company.state': 'State',
  'company.country': 'Country',
  'company.code': 'Postal Code',
  'company.phone': 'Phone',
  'company.fax': 'Fax',
  'company.website': 'Website',
  'company.vatid': 'VATID',
  'company.inn': 'INN',
  'company.kpp': 'KPP',
  'company.bankaccount': 'Bank Account',
  'company.bankname': 'Bank Name',
  'company.bankid': 'BIC',
  'company.corraccount': 'Corr Account',
  'company.director': 'Director',
  'company.bookkeeper': 'Bookkeeper',
  'company.enterpreneur': 'Enterpreneur',
  'company.enterpreneurreg': 'Enterpreneur Registration number',
  'company.okpo': 'OKPO',
  'layout.go-to-website': 'Our Website',

  'user.info': 'User Info',
  'user.description': 'Description',
  'user.about': 'About',
  'user.edit': 'Edit',
  'user.department': 'Department',
  'user.edit-header': 'Edit profile information',
  'user.public-info': 'Public information',
  'user.id': 'ID',
  'user.email': 'Email',
  'user.firstname': 'First Name',
  'user.lastname': 'Last Name',
  'user.account-name': 'Account Name',
  'user.title': 'Title',
  'user.mailing-city': 'Mailing City',
  'user.mailing-street': 'Mailing Street',
  'user.mailing-country': 'Mailing Country',
  'user.mailing-state': 'Mailing State',
  'user.mailing-zip': 'Mailing Zip',
  'user.mailing-pobox': 'Mailing PO Box',
  'user.phone': 'Phone',
  'user.other-country': 'Other Country',
  'user.other-city': 'Other City',
  'user.other-state': 'Other State',
  'user.other-zip': 'Other Zip',
  'user.other-street': 'Other Street',
  'user.other-po-box': 'Other PO Box',
  'user.update': 'Update',
  'user.security-settings': 'Edit security settings',
  'user.update-password': 'Update Password',
  'user.old-password': 'Old Password',
  'user.password': 'Password',
  'user.confirm-password': 'Confirm Password',

  'otp.header': 'Security',
  'otp.tfa': 'Two-Factor Authentication',
  'otp.enable-disable':
    'You can protect your account by 2FA authentication. You will have to enter OTP code after entering your login and password',
  'otp.enable': 'Enable OTP',
  'otp.disable': 'Disable OTP',
  'otp.header2': 'Configuring Google Authenticator or Authy',
  'otp.text2': 'You need to pass some simple steps to setup your 2-factor authentication',
  'otp.li1': 'Install Google AUthenticator or Authy on your smartphone',
  'otp.li2': 'In the authenticator app press + icon',
  'otp.li3':
    'Select &quot;Scan a barcode (or QR code)&quot; and use a phone camera to scan a QR code.',
  'otp.scan-qr': 'Scan a QR code',
  'otp.enter-manually': 'Or enter a code manually into your app',
  'otp.secret-key': 'Secret Key',
  'otp.verify-code': 'Verify code',
  'otp.please-verify': 'For changing the settings, please verify the authentication code:',
  'otp.do-verify': 'Verify and activate',
  'otp.disable-header': 'Disable Two-Factor Authentication',
  'otp.do-disable': 'Disable Two-Factor',
  'otp.disable-content': 'To continue this operation you need to enter Two-Factor token',

  'manager.name': 'Name',
  'manager.email': 'Email',
  'manager.description': 'Description',
  'manager.title': 'Title',
  'manager.phone': 'Phone',
  'manager.department': 'Department',
  'manager.address': 'Address',
  'manager.city': 'City',
  'manager.postcode': 'Postal Code',
  'manager.country': 'Country',
  'manager.info': 'Information about your manager',
  'manager.contact': 'Contact data',

  'tickets.list': 'Tickets List',
  'tickets.ticket_no': 'Ticket #',
  'tickets.assigned_user_id': 'Assigned Manager',
  'tickets.parent_id': 'Parent Id',
  'tickets.ticketpriorities': 'Ticket Priority',
  'tickets.product_id': 'Product ID',
  'tickets.ticketseverities': 'Ticket Severity',
  'tickets.ticketcategories': 'Ticket Category',
  'tickets.ticketstatus': 'Status',
  'tickets.hours': 'Hours',
  'tickets.days': 'Days',
  'tickets.createdtime': 'Created Time',
  'tickets.modifiedtime': 'Modified Time',
  'tickets.from_portal': 'From Portal',
  'tickets.ticket_title': 'Title',
  'tickets.description': 'Description',
  'tickets.solution': 'Solution',
  'tickets.contact_id': 'Contact ID',
  'tickets.id': 'Ticket ID',
  'tickets.label': 'Label',
  'tickets.starred': 'Starred',
  'tickets.tags': 'Tags',
  'tickets.Low': 'Low',
  'tickets.Normal': 'Normal',
  'tickets.High': 'High',
  'tickets.Высокий': 'High',
  'tickets.Особенная': 'Extreme',
  'tickets.Незначительная': 'Super Low',
  'tickets.Другая проблема': 'Other problem',
  'tickets.Urgent': 'Urgent',
  'tickets.Minor': 'Minor',
  'tickets.Major': 'Major',
  'tickets.Feature': 'Feature',
  'tickets.Critical': 'Critical',
  'tickets.Open': 'Open',
  'tickets.In Progress': 'In Progress',
  'tickets.Wait For Response': 'Wait For Response',
  'tickets.Closed': 'Closed',
  'tickets.Big Problem': 'Big Problem',
  'tickets.Small Problem': 'Small Problem',
  'tickets.Other Problem': 'Other Problem',
  'tickets.add': 'Add new Ticket',
  'tickets.save': 'Create Ticket',
  'tickets.update': 'Update Ticket',
  'tickets.detail': 'Tickets detail: ',
  'tickets.was-updated': 'Last update of ticket was: ',
  'tickets.additional-information': 'Additional Information',
  'tickets.no-tags': 'No tags available for this ticket',
  'tickets.comments': 'Related Comments',

  'comments.no-data': 'No comments available',
  'comments.send': 'Send',
  'comments.sending': 'Sending',

  'faq.faqcategories': 'Category of FAQ',
  'faq.list': 'Faqs',
  'faq.General': 'General',
  'faq.faqstatus': 'Status',
  'faq.question': 'Question',
  'faq.faq_answer': 'Answer',
  'faq.no-faqs': 'No Faqs available',
  'faq.more-details': 'Need more details?',
  'faq.read-docs': 'Read our blog!',
  'faq.docs-content':
    'Here you can find valuable articles about business automatization and news about IT in B2B market.',
  'faq.blog': 'Blog',
  'faq.specific-issue': 'Have a specific issue?',
  'faq.check-forum': 'Check Vtiger forum!',
  'faq.forum-text':
    'We are almost sure, that somebody already had an issue and can tell you an answer about your problem. Just ask a community!',
  'faq.forums': 'Forums',
  'faq.look-support': 'Looking for support?',
  'faq.submit-ticket': 'Submit a ticket!',
  'faq.ticket-content':
    'We will try to solve a problem a soon as possible and write a solution for you. Just go to tickets page and sumbit new ticket!',
  'faq.support': 'Support',
  'faq.view': 'View',
  'faq.close': 'Close',
  'faq.extend-knowledge': 'Extend Your Knowledge',

  'project.list': 'Project List',
  'project.projectname': 'Project Name',
  'project.startdate': 'Start Date',
  'project.targetenddate': 'Target End Date',
  'project.actualenddate': 'Actual End Date',
  'project.projectstatus': 'Project Status',
  'project.projecttype': 'Project Type',
  'project.project_no': 'Project Number',
  'project.targetbudget': 'Target Budget',
  'project.projecturl': 'Project URL',
  'project.projectpriority': 'Project Priority',
  'project.progress': 'Progress',
  'project.potentialid': 'Potential ID',
  'project.description': 'Project Description',
  'project.id': 'Project ID',
  'project.label': 'Project Label',
  'project.Внедрен': 'Implemented',
  'project.Обсуждение': 'Discussions',
  'project.Выполняется': 'In Progress',
  'project.Ознакомление': 'Checking Requirenments',
  'project.initiated': 'Initiated',
  'project.prospecting': 'Prospecting',
  'project.delivered': 'Delivered',
  'project.in progress': 'In Progress',
  'project.waiting for feedback': 'Waiting for feedback',
  'project.on hold': 'On Hold',
  'project.completed': 'Completed',
  'project.archived': 'Archived',
  'project.Административное': 'Administrative',
  'project.administrative': 'Administrative',
  'project.Оперативное': 'Operative',
  'project.operative': 'Operative',
  'project.other': 'Other',
  'project.Нормальный': 'Normal',
  'project.normal': 'Normal',
  'project.Высокий': 'High',
  'project.high': 'High',
  'project.low': 'Low',
  'project.detail': 'Project detail: ',
  'project.info': 'Project Information',
  'project.total_tasks': 'Total Tasks',
  'project.total_hours': 'Total Hours',
  'project.open_tasks': 'Open Tasks',
  'project.closed_tasks': 'Closed Tasks',
  'project.in_progress_tasks': 'In Progress Tasks',
  'project.deferred_tasks': 'Deferred Tasks',
  'project.cancelled_tasks': 'Cancelled Tasks',
  'project.low_tasks': 'Low Tasks',
  'project.normal_tasks': 'Normal Tasks',
  'project.high_tasks': 'High Tasks',
  'project.basic-info': 'Basic Information',
  'project.manager': 'Assigned Manager',
  'project.createdtime': 'Created Time',
  'project.documents': 'Attached documents',
  'project.comments': 'Comments',
  'project.progress-tasks': 'Tasks at in progress projects',

  'tasks.tasks': 'Project Tasks',

  'stat.tickets.total': 'Total Tickets',
  'stat.tickets.total-helper': 'Total number of Tickets',
  'stat.tickets.open': 'Open Tickets',
  'stat.tickets.open-helper': 'Open Tickets, total days and total hours',
  'stat.tickets.closed': 'Closed Tickets',
  'stat.tickets.closed-helper': 'Closed Tickets, total days and total hours',
  'stat.tickets.in-progress': 'In Progress Tickets',
  'stat.tickets.in-progress-helper': 'In Progress Tickets, total days and total hours',
  'stat.tickets.wait-response': 'Wait For Response Tickets',
  'stat.tickets.wait-response-helper': 'Wait for response Tickets, total days and total hours',
  'stat.projects.total': 'Total Projects',
  'stat.projects.total-helper': 'Total number of Projects',
  'stat.projects.open': 'Open Projects',
  'stat.projects.open-helper': 'Number of Open Projects',
  'stat.projects.closed': 'Closed Projects',
  'stat.projects.closed-helper': 'Number of Closed Projects',
  'stat.invoices.total': 'Total Invoices and Amount',
  'stat.invoices.open': 'Open Invoices and Amount',
  'stat.invoices.paid': 'Paid Invoices and Amount',
  'stat.tasks.in-progress': 'Tasks in current projects and hours',

  'leads.recommend': 'Recommend Us To Your Friend',
  'leads.recommend-content':
    'If you have a friend, who is interested in our services, just send us his contact\n' +
    '        information, we will contact him shortly.',

  'menu.default': 'Default',
  'menu.visual': 'Visual',
  'menu.analytic': 'Analytic',
  'menu.apps': 'Apps',
  'menu.calendar': 'Calendar',
  'menu.chat': 'Chat',
  'menu.contacts': 'Contacts',
  'menu.mailbox': 'Mailbox',
  'menu.tasks': 'Tasks',
  'menu.pages': 'Pages',
  'menu.authentication': 'Authentication',
  'menu.login': 'Login',
  'menu.register': 'Register',
  'menu.forgot-password': 'Forgot Password',
  'menu.reset-password': 'Reset Password',
  'menu.blog': 'Blog',
  'menu.home': 'Home',
  'menu.grid': 'Grid',
  'menu.list': 'List',
  'menu.detail': 'Detail',
  'menu.miscellaneous': 'Miscellaneous',
  'menu.faq': 'Faq',
  'menu.knowledge-base': 'Knowledge Base',
  'menu.error': 'Error',
  'menu.coming-soon': 'Coming Soon',
  'menu.pricing': 'Pricing',
  'menu.search': 'Search',
  'menu.mailing': 'Mailing',
  'menu.empty': 'Empty',
  'menu.portfolio': 'Portfolio',
  'menu.profile': 'Profile',
  'menu.standard': 'Standard',
  'menu.settings': 'Settings',
  'menu.blocks': 'Blocks',
  'menu.images': 'Images',
  'menu.tabular-data': 'Tabular Data',
  'menu.thumbnails': 'Thumbnails',
  'menu.cta': 'Cta',
  'menu.gallery': 'Gallery',
  'menu.stats': 'Stats',
  'menu.steps': 'Steps',
  'menu.details': 'Details',
  'menu.interface': 'Interface',
  'menu.components': 'Components',
  'menu.accordion': 'Accordion',
  'menu.alerts': 'Alerts',
  'menu.badge': 'Badge',
  'menu.breadcrumb': 'Breadcrumb',
  'menu.buttons': 'Buttons',
  'menu.button-group': 'Button Group',
  'menu.card': 'Card',
  'menu.close-button': 'Close Button',
  'menu.collapse': 'Collapse',
  'menu.dropdowns': 'Dropdowns',
  'menu.list-group': 'List Group',
  'menu.modal': 'Modal',
  'menu.navs': 'Navs',
  'menu.offcanvas': 'Offcanvas',
  'menu.pagination': 'Pagination',
  'menu.popovers': 'Popovers',
  'menu.progress': 'Progress',
  'menu.spinners': 'Spinners',
  'menu.toasts': 'Toasts',
  'menu.tooltips': 'Tooltips',
  'menu.forms': 'Forms',
  'menu.layouts': 'Layouts',
  'menu.validation': 'Validation',
  'menu.wizard': 'Wizard',
  'menu.input-group': 'Input Group',
  'register.left-header': 'Customer Portal',
  'register.left-subheader': 'Manage your tickets',
  'register.left-text':
    'Check status of your tickets and create new one. See all of your invoices\n' +
    '            Communicate with our managers easily. If you have a questions, feel free to contact us...',
  'register.button': 'Learn More',

  'general.item-count': 'Item Count',
  'general.items': 'Items',
  'general.search': 'Search',
  'general.add-new': 'Add New',
  'general.cancel': 'Cancel',
  'general.edit': 'Edit',
  'general.view': 'View',
  'general.no-data': 'No data available',
  'general.close': 'Close',
  'general.loading': 'Loading...',
};

export default ruMessages;
