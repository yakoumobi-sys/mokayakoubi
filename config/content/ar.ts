import type { Content } from './types'

/**
 * Modern Standard Arabic. Worth a native read-through before you push it
 * hard on Instagram — the meaning is right, the rhythm is yours to tune.
 */
export const ar: Content = {
  locale: 'ar',
  dir: 'rtl',
  label: 'ع',
  switcherLabel: 'اللغة',

  meta: {
    title: 'مُكة يعقوبي — علم النفس. الانضباط. البناء.',
    description:
      'مُكة يعقوبي يبني شركات من الجزائر — Caractère و InvoiceDZ — ويشارك ما يتعلمه عن علم النفس والانضباط وبناء المشاريع.',
  },

  profile: {
    tagline: ['علم النفس.', 'الانضباط.', 'البناء.'],
    description: 'أبني شركات وأشارك ما أتعلمه.',
    location: 'الجزائر',
    role: 'مؤسس Caractère و InvoiceDZ',
  },

  nav: {
    labels: {
      start: 'ابدأ',
      projects: 'المشاريع',
      resources: 'الموارد',
      contact: 'تواصل',
    },
    startCta: 'ابدأ من هنا',
    skip: 'تخطَّ إلى المحتوى',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },

  hero: {
    secondaryCta: 'تصفّح مشاريعي',
  },

  startHere: {
    eyebrow: 'ابدأ من هنا',
    title: 'The Moka Playbook',
    description:
      'مجموعة مجانية من الأفكار التي أعود إليها دائمًا — كيف يفكر الناس، كيف تحافظ على انضباطك، كيف تتواصل، كيف تبيع، وكيف تبني فعلًا.',
    topics: [
      'علم النفس',
      'الانضباط',
      'التواصل',
      'البيع',
      'بناء المشاريع',
      'فهم الناس',
    ],
    cta: 'احصل عليه مجانًا',
    fileCta: 'تحميل الملف',
    note: 'الإصدار 01 · ملف PDF من 18 صفحة، بالفرنسية · بلا رسائل مزعجة، يمكنك إلغاء الاشتراك متى شئت.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'you@email.com',
    sending: 'جارٍ الإرسال…',
    done: 'تم. تفضّل.',
    delivered: 'تفضّل.',
    errors: {
      invalid: 'أدخل بريدًا إلكترونيًا صحيحًا.',
      notOpen: 'التسجيل لم يُفتح بعد. حاول بعد قليل.',
      generic: 'حدث خطأ ما. حاول مرة أخرى.',
    },
  },

  projects: {
    caractere: {
      name: 'Caractère',
      description:
        'أطلق علامتك للملابس أو اطلب ملابس مخصّصة، دون التعامل مع تعقيدات الإنتاج.',
      status: 'متاح',
      sectionTitle: 'ابنِ علامتك.',
      cta: 'اكتشف Caractère',
      primaryCta: 'أطلق علامتك للملابس',
      guideCta: 'احصل على الدليل مجانًا',
    },
    invoicedz: {
      name: 'InvoiceDZ',
      description:
        'فواتير وعروض أسعار ووصولات مطابقة للجزائر — الرسم على القيمة المضافة وحق الطابع والمبلغ بالحروف تُحسب تلقائيًا. مجانًا.',
      status: 'متاح',
      sectionTitle: 'أدر نشاطك.',
      cta: 'اكتشف InvoiceDZ',
    },
  },

  learn: {
    eyebrow: 'الموارد',
    title: 'تعلّم.',
    intro: 'موارد وأنظمة وأدوات أستعملها فعلًا.',
    get: 'احصل عليه',
    more: 'المزيد قادم.',
  },

  resources: {
    'moka-playbook': {
      title: 'The Moka Playbook',
      description:
        '14 فكرة عن علم النفس والانضباط والبيع وبناء المشاريع. الإصدار 01، بالفرنسية.',
      price: 'مجانًا',
      type: 'playbook',
    },
    'build-your-brand': {
      title: 'Build Your Brand',
      description:
        'كيف تطلق علامتك للملابس دون التعامل مع الإنتاج. 10 صفحات، بالفرنسية.',
      price: 'مجانًا',
      type: 'دليل',
    },
  },

  building: {
    eyebrow: 'المشاريع',
    title: 'ما أبنيه.',
  },

  tools: {
    eyebrow: 'الأدوات',
    title: 'ما أستعمله.',
    subtitle: 'أدوات أدفع ثمنها وأستعملها كل أسبوع.',
    disclosure: 'بعض هذه الروابط روابط تسويق بالعمولة.',
  },

  stats: {
    labels: {
      instagram: 'إنستغرام',
      views: 'مشاهدة · آخر 30 يومًا',
    },
    note: 'مؤسس Caractère و InvoiceDZ',
  },

  contact: {
    eyebrow: 'تواصل',
    title: 'العمل معي.',
    cta: 'تواصل معي',
    categories: [
      {
        title: 'شراكات العلامات',
        description: 'للعلامات التي تريد التعاون على المحتوى.',
        subject: 'شراكة علامة',
      },
      {
        title: 'طلبات الأعمال والمشاريع',
        description: 'للطلبات المهنية الجادة.',
        subject: 'طلب أعمال',
      },
      {
        title: 'المحاضرات والفعاليات',
        description: 'مؤتمرات، فعاليات، بودكاست.',
        subject: 'محاضرة / فعالية',
      },
    ],
  },

  footer: {
    elsewhere: 'روابط',
    projects: 'المشاريع',
    contact: 'تواصل',
    email: 'البريد',
  },
}
