import React, { useEffect, useMemo, useRef, useState } from 'react';
import logoUrl from 'container:///mnt/data/src/assets/0a74042b9afcbfbc-img-u7531699226708646296-2.jpg';

type Vocab={en:string;ar:string;unit:number};
type Grammar={title:string;explain:string;form:string;examples:string[];quiz:{q:string;options:string[];answer:number}[]};
type Unit={id:number;title:string;titleAr:string;focus:string;periods:string[];vocab:Vocab[];grammar:Grammar[];readingTitle:string;reading:string;comprehension:{q:string;options:string[];answer:number}[];tf:{q:string;answer:boolean}[];quiz:{q:string;options:string[];answer:number}[]};

const UNITS:Unit[]=[
{id:1,title:'Making contact',titleAr:'التواصل',focus:'الخطط والجداول • سرد الأحداث • كتابة بريد إلكتروني',periods:['التعرّف والتواصل: التعريف بالنفس وتبادل معلومات التواصل','الخطط المستقبلية: المضارع البسيط والمستمر للمستقبل','سرد حدث: ترتيب الأحداث وربطها','كتابة بريد إلكتروني رسمي/ودي: طلب وردّ'],vocab:[{en:'apartment',ar:'شقة',unit:1},{en:'attach',ar:'يرفق',unit:1},{en:'cancel',ar:'يلغي',unit:1},{en:'definite',ar:'مؤكد / محدد',unit:1},{en:'depart',ar:'يغادر',unit:1},{en:'district',ar:'منطقة / حي',unit:1},{en:'junior',ar:'ناشئ / أصغر',unit:1},{en:'PS',ar:'ملاحظة إضافية',unit:1},{en:'contact',ar:'يتواصل / جهة اتصال',unit:1},{en:'research',ar:'بحث',unit:1},{en:'reply',ar:'يرد',unit:1},{en:'settle in',ar:'يستقر',unit:1},{en:'lead',ar:'يقود',unit:1},{en:'show round',ar:'يرشد في جولة',unit:1},{en:'take out',ar:'يُخرج / يدعو للخارج',unit:1}],grammar:[{title:'المضارع البسيط والمستمر للمستقبل',explain:'نستخدم المضارع البسيط للجداول والمواعيد الثابتة، والمضارع المستمر للخطط المؤكدة والترتيبات.',form:'Present Simple: The train leaves at 7. | Present Continuous: I am meeting Basim tomorrow.',examples:['The plane departs at 9 a.m.','We are visiting Jenny on Friday.','She is coming to Gaza next week.'],quiz:[{q:'The train ___ at 6:30 tomorrow. (جدول ثابت)',options:['leaves','is leaving now','left'],answer:0},{q:'I ___ my friend at the airport tomorrow. (ترتيب مؤكد)',options:['am meeting','meet every day','met'],answer:0}]},{title:'will مقابل going to',explain:'will للقرار السريع والوعود والتنبؤ العام. going to للخطط المعدّة والتنبؤ المبني على دليل.',form:'will + مصدر | am/is/are + going to + مصدر',examples:['I will reply to your email soon.','We are going to move to a new apartment.','Look at the clouds! It is going to rain.'],quiz:[{q:'I have decided: I ___ study English tonight.',options:['am going to','will maybe','go'],answer:0},{q:'I promise, I ___ help you.',options:['will','am going to study','am'],answer:0}]}],readingTitle:'رسائل بريد: جيني وباسم',reading:'كتبت جيني رسالة إلى باسم لتخبره بخططها ووصولها، وردّ باسم مرحّبًا بها وموضّحًا ترتيبات الاستقبال والجولة. الرسائل تُظهر كيف نرتّب اللقاءات، ونؤكّد المواعيد، ونستخدم عبارات مهذبة في بداية البريد ونهايته.',comprehension:[{q:'ما هدف رسالة جيني؟',options:['إخبار باسم بخطط وصولها','طلب وظيفة','وصف الطقس'],answer:0},{q:'ماذا فعل باسم في ردّه؟',options:['رحّب بها ووضّح الترتيبات','رفض مقابلتها','طلب المال'],answer:0}],tf:[{q:'البريد الإلكتروني يبدأ بتحية مهذبة.',answer:true},{q:'لا نحتاج تأكيد الموعد في الرسائل.',answer:false}],quiz:[{q:'Choose the correct future: The bus ___ at 8.',options:['leaves','leave','leaving'],answer:0},{q:'I have bought tickets. We ___ travel tomorrow.',options:['are going to','will to','goes to'],answer:0},{q:'apartment means:',options:['شقة','مدرسة','مطار'],answer:0},{q:'reply means:',options:['يرد','يغادر','يلغي'],answer:0},{q:'She ___ her friend tomorrow. (arrangement)',options:['is meeting','meets every day','meet'],answer:0},{q:'PS in an email means:',options:['an extra note','a new subject','goodbye'],answer:0}]},
{id:2,title:'From here to there',titleAr:'من هنا إلى هناك',focus:'الرحلات • سرد قصة • تحديد المواقع',periods:['مفردات الرحلات والاتجاهات','المضارع التام والمضارع التام المستمر','الماضي البسيط مقابل المضارع التام','سرد قصة رحلة كاملة'],vocab:[{en:'exact',ar:'دقيق',unit:2},{en:'GPS',ar:'نظام تحديد المواقع',unit:2},{en:'kph',ar:'كم/ساعة',unit:2},{en:'life raft',ar:'قارب نجاة',unit:2},{en:'measure',ar:'يقيس',unit:2},{en:'near',ar:'قريب',unit:2},{en:'nearly',ar:'تقريبًا',unit:2},{en:'orbit',ar:'يدور / مدار',unit:2},{en:'point',ar:'نقطة',unit:2},{en:'position',ar:'موقع',unit:2},{en:'row',ar:'يجدّف',unit:2},{en:'satellite phone',ar:'هاتف فضائي',unit:2},{en:'satnav',ar:'ملاحة فضائية',unit:2},{en:'storm',ar:'عاصفة',unit:2},{en:'wave',ar:'موجة',unit:2}],grammar:[{title:'المضارع التام والمضارع التام المستمر',explain:'المضارع التام للنتيجة والخبرة. المستمر للنشاط الذي بدأ في الماضي وما زال مستمرًا أو أثّر الآن.',form:'have/has + V3 | have/has been + V-ing',examples:['He has crossed the ocean.','We have been rowing for six hours.','I have used GPS many times.'],quiz:[{q:'They ___ for three hours.',options:['have been rowing','has row','rowed yesterday'],answer:0},{q:'She ___ the map. (خبرة)',options:['has seen','is see','have saw'],answer:0}]},{title:'الماضي البسيط مقابل المضارع التام',explain:'الماضي البسيط لوقت محدد انتهى. المضارع التام لزمن غير محدد وله أثر الآن.',form:'Past Simple: He left in 2010. | Present Perfect: He has left.',examples:['Mark rowed across the Atlantic.','He has rowed across the Atlantic.','We arrived yesterday. / We have just arrived.'],quiz:[{q:'I ___ him yesterday.',options:['saw','have seen','see'],answer:0},{q:'I ___ him before. (خبرة بدون وقت)',options:['have seen','saw yesterday','see now'],answer:0}]}],readingTitle:'Finding the way — مارك ستابس',reading:'جدّف مارك ستابس عبر المحيط الأطلسي. اعتمد على الخرائط والملاحة ونظام تحديد المواقع GPS. أنقذ نظام تحديد المواقع حياة كثيرين لأنه يحدد الموقع بدقة ويساعد فرق الإنقاذ في الوصول بسرعة.',comprehension:[{q:'كيف عبر مارك الأطلسي؟',options:['بالجدّف','بالطائرة','بالقطار'],answer:0},{q:'لماذا أنقذ GPS حياة الناس؟',options:['يحدد الموقع بدقة','يجعل البحر هادئًا','يوقف العواصف'],answer:0}],tf:[{q:'GPS يساعد في تحديد الموقع.',answer:true},{q:'كان عبور مارك سهلًا بلا تحديات.',answer:false}],quiz:[{q:'Present Perfect of “row” is:',options:['has rowed','rowed','is row'],answer:0},{q:'exact means:',options:['دقيق','بعيد','سريع'],answer:0},{q:'measure means:',options:['يقيس','يجدّف','يدور'],answer:0},{q:'They ___ since morning.',options:['have been travelling','travelled yesterday','travel'],answer:0},{q:'storm means:',options:['عاصفة','موجة صغيرة','طريق'],answer:0},{q:'GPS is used to:',options:['find position','make food','write email'],answer:0}]},
{id:3,title:'Freetime activities',titleAr:'أنشطة وقت الفراغ',focus:'الاهتمامات • الأفعال الناقصة • تحويل الهواية إلى عمل',periods:['التحدث عن الاهتمامات والهوايات','الأفعال الناقصة: may / might / can / could','الأفعال الناقصة: shall / should / must / have to','عرض: هوايتي وكيف أطوّرها'],vocab:[{en:'afford',ar:'يستطيع تحمل التكلفة',unit:3},{en:'business',ar:'عمل / تجارة',unit:3},{en:'castle',ar:'قلعة',unit:3},{en:'decorate',ar:'يزيّن',unit:3},{en:'frame',ar:'إطار',unit:3},{en:'free',ar:'حر / مجاني',unit:3},{en:'on my own',ar:'وحدي',unit:3},{en:'recycle',ar:'يعيد تدوير',unit:3},{en:'similar',ar:'مشابه',unit:3},{en:'supply',ar:'يزوّد',unit:3},{en:'think of',ar:'يفكّر في',unit:3},{en:'turn into',ar:'يتحوّل إلى',unit:3}],grammar:[{title:'may / might / can / could',explain:'may/might للاحتمال والطلب المهذب. can/could للقدرة والطلب. could أكثر تهذيبًا.',form:'may/might/can/could + مصدر',examples:['It may rain today.','I can play football.','Could you help me, please?'],quiz:[{q:'It ___ rain. (احتمال)',options:['might','must now','is must'],answer:0},{q:'___ you help me? (طلب مهذب)',options:['Could','Must','May be'],answer:0}]},{title:'should / must / have to / need to',explain:'should للنصيحة. must للضرورة القوية والقوانين. have to للضرورة من مصدر خارجي. need to للحاجة.',form:'should/must/have to/need to + مصدر',examples:['You should practise every day.','You must stop.','I have to finish my homework.'],quiz:[{q:'You ___ wear a seatbelt. (قانون)',options:['must','may','might'],answer:0},{q:'You ___ study hard. (نصيحة)',options:['should','can to','must to'],answer:0}]}],readingTitle:'Turning a hobby into a business',reading:'حوّل جو هوايته في الدراجات إلى عمل، وحوّلت آن هوايتها في صنع الكعك إلى مشروع. النجاح يحتاج شغفًا وتخطيطًا وعملًا منتظمًا، والهواية تصبح عملًا عندما يطلبها الناس ويدفعون مقابلها.',comprehension:[{q:'ماذا حوّل جو؟',options:['هواية الدراجات إلى عمل','الدراسة إلى لعب','الطعام إلى رياضة'],answer:0},{q:'ماذا صنعت آن؟',options:['الكعك','السيارات','الملابس'],answer:0}],tf:[{q:'الشغف وحده يكفي بلا تخطيط.',answer:false},{q:'الهواية قد تصبح عملًا ناجحًا.',answer:true}],quiz:[{q:'afford means:',options:['يستطيع تحمل التكلفة','يبيع','يشتري دائمًا'],answer:0},{q:'You ___ respect others.',options:['should','might to','can to'],answer:0},{q:'recycle means:',options:['يعيد تدوير','يرمي','يحرق'],answer:0},{q:'It ___ be true. (احتمال)',options:['might','must to','should to'],answer:0},{q:'supply means:',options:['يزوّد','يمنع','يكسر'],answer:0},{q:'turn into means:',options:['يتحوّل إلى','يعود إلى','يخرج من'],answer:0}]},
{id:4,title:'Emergency!',titleAr:'طوارئ!',focus:'أعمال الطوارئ • سرد حدث ماضٍ • الظروف',periods:['مفردات الطوارئ وأعمال الإنقاذ','الظروف المنتهية بـ -ly','الظروف الشاذة: fast / hard / well / early','سرد حادث وإنقاذ'],vocab:[{en:'explosion',ar:'انفجار',unit:4},{en:'flames',ar:'ألسنة اللهب',unit:4},{en:'ledge',ar:'حافة',unit:4},{en:'paramedics',ar:'مسعفون',unit:4},{en:'desperately',ar:'بيأس',unit:4},{en:'luckily',ar:'لحسن الحظ',unit:4},{en:'silently',ar:'بصمت',unit:4},{en:'quickly',ar:'بسرعة',unit:4}],grammar:[{title:'الظروف المنتهية بـ -ly',explain:'الظرف يصف الفعل ويُكوَّن غالبًا بإضافة -ly إلى الصفة. يأتي بعد الفعل أو في بداية الجملة.',form:'adjective + -ly → adverb',examples:['She spoke quietly.','They worked quickly.','Luckily, everyone was safe.'],quiz:[{q:'Adverb of “quick” is:',options:['quickly','quicklyly','quicker'],answer:0},{q:'___ , the child was safe.',options:['Luckily','Lucky','Luck'],answer:0}]},{title:'ظروف شاذة',explain:'بعض الظروف لا تنتهي بـ -ly: fast / hard / well / early. well هي ظرف good.',form:'fast / hard / well / early',examples:['He runs fast.','She works hard.','He speaks English well.','We arrived early.'],quiz:[{q:'She speaks English ___.',options:['well','goodly','wellly'],answer:0},{q:'They arrived ___.',options:['early','earlierly','earlyly'],answer:0}]}],readingTitle:'إنقاذ هيلين ويست',reading:'تروي القصة إنقاذ هيلين ويست في موقف خطير. تصرّف المنقذون بسرعة وحذر، وتعاون الناس، ووصول المسعفين أنقذ حياتها. القصة تُظهر الشجاعة والعمل السريع المنظم.',comprehension:[{q:'ما الذي أنقذ هيلين؟',options:['تصرّف سريع ومنظم ووصول المسعفين','البقاء دون مساعدة','تجاهل الخطر'],answer:0},{q:'كيف تصرّف المنقذون؟',options:['بسرعة وحذر','ببطء','بصمت تام فقط'],answer:0}],tf:[{q:'وصول المسعفين مهم في الطوارئ.',answer:true},{q:'التهور أفضل من الحذر في الإنقاذ.',answer:false}],quiz:[{q:'explosion means:',options:['انفجار','مطر','هدوء'],answer:0},{q:'flames means:',options:['ألسنة اللهب','ماء','دخان فقط'],answer:0},{q:'She ran ___.',options:['quickly','quick','quickerly'],answer:0},{q:'paramedics are:',options:['مسعفون','معلمون','سائقون'],answer:0},{q:'He works ___.',options:['hard','hardly only','hardlyly'],answer:0},{q:'Luckily means:',options:['لحسن الحظ','للأسف','بغضب'],answer:0}]},
{id:5,title:'Dangerous weather',titleAr:'طقس خطير',focus:'الطقس • النشرة الجوية • المقارنة',periods:['مفردات الطقس والكوارث','المقارنة والتفضيل','as ... as و better / best','كتابة نشرة جوية وتحذير'],vocab:[{en:'accurate',ar:'دقيق',unit:5},{en:'approach',ar:'يقترب',unit:5},{en:'breathe',ar:'يتنفس',unit:5},{en:'combine',ar:'يجمع',unit:5},{en:'escape',ar:'يهرب',unit:5},{en:'force',ar:'قوة',unit:5},{en:'heat',ar:'حرارة',unit:5},{en:'moreover',ar:'علاوة على ذلك',unit:5},{en:'poor',ar:'فقير / سيئ',unit:5},{en:'proper',ar:'مناسب / صحيح',unit:5},{en:'result',ar:'نتيجة',unit:5},{en:'storm surge',ar:'ارتفاع موج العاصفة',unit:5}],grammar:[{title:'المقارنة والتفضيل',explain:'للمقارنة: صفة + er + than / more + صفة + than. للتفضيل: the + صفة + est / the most + صفة.',form:'bigger than | more dangerous than | the strongest',examples:['This storm is stronger than the last one.','It was the worst storm in years.','Today is hotter than yesterday.'],quiz:[{q:'This is ___ than yesterday.',options:['hotter','hottest','hot'],answer:0},{q:'It is the ___ storm.',options:['strongest','stronger','strong'],answer:0}]},{title:'as ... as و better / best',explain:'as + صفة + as للتشابه. better تفضيل good، و best الأفضل. worse / worst لـ bad.',form:'as fast as | better than | the best',examples:['He is as fast as his brother.','This forecast is better than yesterday.','It was the best warning.'],quiz:[{q:'She is ___ as her sister.',options:['as tall as','taller as','tall as'],answer:0},{q:'This is ___ than that.',options:['better','good','best'],answer:0}]}],readingTitle:'Hurricane lives',reading:'في عام 1970 مات نحو 500,000 شخص في بنغلاديش بسبب إعصار. وفي عام 1992 ضرب إعصار أندرو بسرعة رياح 118 كم/ساعة في البداية، وامتد 800 كم، ووصلت الرياح إلى 222 كم/ساعة، وارتفع الموج 10 أمتار. هذه الأرقام تُظهر خطورة الأعاصير وأهمية التحذير المبكر.',comprehension:[{q:'كم مات في إعصار بنغلاديش 1970؟',options:['نحو 500,000','نحو 500','نحو 5,000'],answer:0},{q:'كم بلغ ارتفاع الموج في أندرو؟',options:['10 أمتار','متر واحد','100 متر'],answer:0}],tf:[{q:'التحذير المبكر مهم في الأعاصير.',answer:true},{q:'إعصار أندرو كان ضعيفًا.',answer:false}],quiz:[{q:'accurate means:',options:['دقيق','قوي','بعيد'],answer:0},{q:'breathe means:',options:['يتنفس','يهرب','يقترب'],answer:0},{q:'Today is ___ than yesterday.',options:['hotter','hottest','hot'],answer:0},{q:'escape means:',options:['يهرب','يتنفس','يجمع'],answer:0},{q:'Hurricane Andrew wind reached:',options:['222 kph','22 kph','2222 kph'],answer:0},{q:'She is ___ as her friend.',options:['as tall as','tall as','taller as'],answer:0}]},
{id:6,title:'Working for a better world',titleAr:'العمل من أجل عالم أفضل',focus:'قصة حياة • الماضي بأنواعه • used to',periods:['قصة حياة شخصية ملهمة','الماضي البسيط والمستمر والتام','used to للعادات الماضية','كتابة سيرة ذاتية قصيرة'],vocab:[{en:'refugees',ar:'لاجئون',unit:6},{en:'settlements',ar:'مستوطنات / تجمعات',unit:6},{en:'published',ar:'نشر',unit:6},{en:'abroad',ar:'في الخارج',unit:6},{en:'delighted',ar:'مسرور جدًا',unit:6}],grammar:[{title:'الماضي البسيط والمستمر والتام',explain:'البسيط لحدث منتهٍ. المستمر لحدث كان جاريًا. التام لحدث سبق حدثًا آخر في الماضي.',form:'V2 | was/were + V-ing | had + V3',examples:['He wrote his first book in 1960.','While he was living abroad, he wrote poems.','He had left his village before 1948.'],quiz:[{q:'While he ___ , he wrote.',options:['was living','lived','had lived'],answer:0},{q:'He ___ his book before 1960.',options:['had written','writes','is writing'],answer:0}]},{title:'used to',explain:'used to + مصدر لعادة أو حقيقة كانت في الماضي ولم تعد الآن.',form:'used to + مصدر',examples:['He used to live in Al-Birwah.','We used to play in the village.'],quiz:[{q:'I ___ live in a village.',options:['used to','use to','used'],answer:0},{q:'Used to talks about:',options:['past habits','future plans','present only'],answer:0}]}],readingTitle:'محمود درويش',reading:'وُلد محمود درويش عام 1942 في البروة. أصبح لاجئًا مع عائلته عام 1948. نشر أول كتاب له عام 1960. غادر إلى المنفى عام 1970، وعاد عام 1996، وتوفي عام 2008. كتب عن الوطن والإنسان والحرية.',comprehension:[{q:'أين وُلد درويش؟',options:['البروة','غزة','القدس'],answer:0},{q:'متى نشر أول كتاب؟',options:['1960','1942','2008'],answer:0}],tf:[{q:'درويش وُلد عام 1942.',answer:true},{q:'درويش لم يغادر وطنه أبدًا.',answer:false}],quiz:[{q:'refugees means:',options:['لاجئون','سياح','معلمون'],answer:0},{q:'published means:',options:['نشر','سافر','عاد'],answer:0},{q:'He ___ live here.',options:['used to','use to','uses to'],answer:0},{q:'Darwish returned in:',options:['1996','1948','1960'],answer:0},{q:'He had left before:',options:['had + V3','will + V3','is + V3'],answer:0},{q:'delighted means:',options:['مسرور جدًا','حزين','غاضب'],answer:0}]},
{id:7,title:'Good news from the doctors',titleAr:'أخبار سارة من الأطباء',focus:'نقل الكلام • الأخبار الطبية',periods:['مفردات طبية وأخبار سارة','الكلام المنقول: الأقوال','الكلام المنقول: الأسئلة والأوامر','كتابة تقرير خبر'],vocab:[{en:'recovered',ar:'تعافى',unit:7},{en:'rapidly',ar:'بسرعة',unit:7},{en:'ramps',ar:'منحدرات',unit:7},{en:'diary',ar:'مفكرة',unit:7},{en:'put off',ar:'يؤجل',unit:7},{en:'medical',ar:'طبي',unit:7}],grammar:[{title:'الكلام المنقول: الأقوال',explain:'عند نقل الكلام نرجع بالزمن خطوة: المضارع يصبح ماضيًا، والماضي يصبح ماضيًا تامًا، ونغيّر الضمائر والظروف.',form:'“I am well.” → He said he was well.',examples:['“I can help.” → He said he could help.','“We are ready.” → They said they were ready.'],quiz:[{q:'“I am happy.” → He said he ___ happy.',options:['was','is','were'],answer:0},{q:'“I can walk.” → He said he ___ walk.',options:['could','can','will'],answer:0}]},{title:'الكلام المنقول: الأسئلة والأوامر',explain:'السؤال: asked + if/whether أو أداة الاستفهام. الأمر: asked/told + to + مصدر.',form:'asked if ... | told me to ...',examples:['“Do you feel better?” → He asked if I felt better.','“Rest!” → The doctor told him to rest.'],quiz:[{q:'“Sit down.” → He told me ___ down.',options:['to sit','sit','sitting'],answer:0},{q:'“Are you well?” → He asked if I ___ well.',options:['was','am','be'],answer:0}]}],readingTitle:'د. واي والذراع الآلية',reading:'طوّر الدكتور واي ذراعًا آلية تفهم رسائل الدماغ. تساعد الذراع المرضى على الإمساك بالأشياء والقيام بأعمال يومية. هذا خبر سار لأن العلم يمنح الناس حركة واستقلالًا أكبر.',comprehension:[{q:'ماذا تفهم الذراع الآلية؟',options:['رسائل الدماغ','الطقس','الرسائل النصية'],answer:0},{q:'ماذا تساعد المرضى؟',options:['الإمساك بالأشياء','الطيران','السباحة'],answer:0}],tf:[{q:'الذراع تساعد في الأعمال اليومية.',answer:true},{q:'العلم لا يفيد المرضى.',answer:false}],quiz:[{q:'recovered means:',options:['تعافى','مرض','تأخر'],answer:0},{q:'“I am well.” → He said he ___ well.',options:['was','is','are'],answer:0},{q:'rapidly means:',options:['بسرعة','ببطء','بحزن'],answer:0},{q:'medical means:',options:['طبي','مدرسي','رياضي'],answer:0},{q:'put off means:',options:['يؤجل','يبدأ','ينهي'],answer:0},{q:'He told me ___ rest.',options:['to','for','at'],answer:0}]},
{id:8,title:'Which way at 16?',titleAr:'أي طريق في سن 16؟',focus:'الاختيارات بعد 16 • الشروط • التخطيط',periods:['خيارات الدراسة والعمل بعد 16','الشرط الأول والثاني','الشرط الثالث','كتابة رسالة وخطة زيارة'],vocab:[{en:'determined',ar:'مصمم',unit:8},{en:'routes',ar:'مسارات / طرق',unit:8},{en:'vocational',ar:'مهني',unit:8},{en:'qualifications',ar:'مؤهلات',unit:8},{en:'flexible',ar:'مرن',unit:8},{en:'responsible',ar:'مسؤول',unit:8}],grammar:[{title:'الشرط الأول والثاني',explain:'الأول: حقيقة ممكنة If + مضارع، will + مصدر. الثاني: خيال If + ماضٍ، would + مصدر.',form:'If + Present, will + V | If + Past, would + V',examples:['If you study, you will succeed.','If I had time, I would learn French.'],quiz:[{q:'If you study, you ___ succeed.',options:['will','would','succeed'],answer:0},{q:'If I had money, I ___ travel.',options:['would','will','am'],answer:0}]},{title:'الشرط الثالث',explain:'الشرط الثالث للندم على الماضي: If + ماضٍ تام، would have + تصريف ثالث.',form:'If + had + V3, would have + V3',examples:['If I had studied, I would have passed.','If she had come, we would have met her.'],quiz:[{q:'If I had studied, I ___ passed.',options:['would have','will','would'],answer:0},{q:'Third conditional talks about:',options:['past regret','future plan','present habit'],answer:0}]}],readingTitle:'د. روسي: اختيارات الحياة',reading:'في عام 1700 كانت الخيارات قليلة، وفي عام 1900 زادت، واليوم الخيارات كثيرة: دراسة أكاديمية أو تعليم مهني أو عمل. الاختيار الجيد يحتاج معرفة القدرات والميول والتخطيط.',comprehension:[{q:'ما خيارات اليوم؟',options:['أكاديمي أو مهني أو عمل','خيار واحد فقط','لا خيارات'],answer:0},{q:'ماذا يحتاج الاختيار الجيد؟',options:['معرفة القدرات والتخطيط','الصدفة فقط','المال فقط'],answer:0}],tf:[{q:'التعليم المهني خيار حقيقي.',answer:true},{q:'كانت الخيارات اليوم أقل من 1700.',answer:false}],quiz:[{q:'determined means:',options:['مصمم','متردد','كسول'],answer:0},{q:'vocational means:',options:['مهني','طبي','رياضي'],answer:0},{q:'If you work hard, you ___ pass.',options:['will','would','had'],answer:0},{q:'qualifications means:',options:['مؤهلات','أموال','ألعاب'],answer:0},{q:'If I had known, I ___ come.',options:['would have','will','would'],answer:0},{q:'flexible means:',options:['مرن','صلب','ثقيل'],answer:0}]},
{id:9,title:'Healthy eating',titleAr:'أكل صحي',focus:'جسم صحي • خيارات صحية • طبق فلسطيني',periods:['مفردات الغذاء الصحي','so that / in order to','أدوات التعريف والضمائر who / which','وصف طبق فلسطيني صحي'],vocab:[{en:'strengthen',ar:'يقوّي',unit:9},{en:'surprised',ar:'متفاجئ',unit:9},{en:'consist of',ar:'يتكون من',unit:9},{en:'balanced',ar:'متوازن',unit:9},{en:'average',ar:'متوسط',unit:9},{en:'nutrient',ar:'مادة مغذية',unit:9},{en:'energy',ar:'طاقة',unit:9},{en:'energetic',ar:'نشيط',unit:9}],grammar:[{title:'so that / in order to',explain:'so that + جملة لبيان الغرض. in order to + مصدر لبيان الغرض بطريقة رسمية.',form:'in order to + V | so that + subject + verb',examples:['I eat well in order to stay healthy.','I study so that I can pass.'],quiz:[{q:'I eat well ___ stay healthy.',options:['in order to','so that I','because to'],answer:0},{q:'I study ___ I can pass.',options:['so that','in order','to that'],answer:0}]},{title:'أدوات التعريف و who / which',explain:'who للعاقل، و which لغير العاقل. a/an للنكرة، و the للمعرفة.',form:'who + فعل | which + فعل',examples:['The food which helps us is healthy.','The teacher who helps us is kind.'],quiz:[{q:'The boy ___ helps us is Ali.',options:['who','which','whom'],answer:0},{q:'The food ___ is healthy is fruit.',options:['which','who','whom'],answer:0}]}],readingTitle:'أكل صحي وغذاء متوازن',reading:'الغذاء المتوازن يتكون من خضار وفواكه وحبوب وبروتين وماء. يعطي الجسم طاقة وعناصر مغذية، ويقوّي المناعة، ويحافظ على النشاط. الخيارات الصحية الصغيرة كل يوم تصنع فرقًا كبيرًا.',comprehension:[{q:'ماذا يتكون الغذاء المتوازن؟',options:['خضار وفواكه وحبوب وبروتين وماء','حلويات فقط','مشروبات غازية'],answer:0},{q:'ماذا يعطي الغذاء الصحي؟',options:['طاقة وعناصر مغذية','تعب فقط','مرض'],answer:0}],tf:[{q:'الماء جزء من الغذاء الصحي.',answer:true},{q:'الحلويات وحدها غذاء متوازن.',answer:false}],quiz:[{q:'balanced means:',options:['متوازن','كثير','قليل'],answer:0},{q:'nutrient means:',options:['مادة مغذية','مرض','دواء'],answer:0},{q:'I eat fruit ___ stay strong.',options:['in order to','so that I','to that'],answer:0},{q:'strengthen means:',options:['يقوّي','يضعف','يمنع'],answer:0},{q:'The girl ___ cooks is Sara.',options:['who','which','where'],answer:0},{q:'energetic means:',options:['نشيط','متعب','جائع'],answer:0}]},
{id:10,title:"Talking about tomorrow's world",titleAr:'الحديث عن عالم الغد',focus:'مواقف خيالية • التنبؤ بالمستقبل • المبني للمجهول',periods:['التنبؤ بالمستقبل ومواقف خيالية','المبني للمجهول: المضارع والماضي','المبني للمجهول: بقية الأزمنة','كتابة رأي: مستقبل جيد أم سيئ؟'],vocab:[{en:'peaceful',ar:'مسالم',unit:10},{en:'available',ar:'متوفر',unit:10},{en:'pressure',ar:'ضغط',unit:10},{en:'pollution',ar:'تلوث',unit:10},{en:'starve',ar:'يجوع',unit:10},{en:'cruel',ar:'قاسٍ',unit:10},{en:'oppress',ar:'يضطهد',unit:10},{en:'avoid',ar:'يتجنب',unit:10},{en:'prevent',ar:'يمنع',unit:10},{en:'survive',ar:'ينجو / يعيش',unit:10}],grammar:[{title:'المبني للمجهول: المضارع والماضي',explain:'نحذف الفاعل أو نركز على المفعول: am/is/are + V3 للمضارع، و was/were + V3 للماضي.',form:'is + V3 | was + V3',examples:['English is spoken here.','The book was written in 1960.'],quiz:[{q:'English ___ in many countries.',options:['is spoken','speaks','spoke'],answer:0},{q:'The letter ___ yesterday.',options:['was written','writes','write'],answer:0}]},{title:'المبني للمجهول: بقية الأزمنة',explain:'نحافظ على زمن الجملة ونضيف be + V3: will be + V3، has been + V3، is being + V3.',form:'will be + V3 | has been + V3',examples:['The school will be built soon.','The work has been done.'],quiz:[{q:'The school ___ built soon.',options:['will be','will','be'],answer:0},{q:'The work ___ done.',options:['has been','have','is be'],answer:0}]}],readingTitle:'مستقبل جيد أم سيئ؟',reading:'تحدث روزا وليام وهيساكو وسيمو وباسم عن المستقبل: هل سيكون عالمًا مسالمًا ونظيفًا، أم مليئًا بالتلوث والضغط؟ الجميع يتفق أن اختياراتنا اليوم تصنع مستقبلنا، وأن علينا منع التلوث وتجنب الظلم.',comprehension:[{q:'ما موضوع حديث الطلاب؟',options:['مستقبل العالم','طعام اليوم','درس الرياضة'],answer:0},{q:'ماذا تصنع اختياراتنا؟',options:['مستقبلنا','لا شيء','الماضي'],answer:0}],tf:[{q:'التلوث مشكلة مستقبلية محتملة.',answer:true},{q:'اختياراتنا لا تؤثر في المستقبل.',answer:false}],quiz:[{q:'peaceful means:',options:['مسالم','قاسٍ','متعب'],answer:0},{q:'pollution means:',options:['تلوث','سلام','طاقة'],answer:0},{q:'English ___ here.',options:['is spoken','speaks','spoke'],answer:0},{q:'prevent means:',options:['يمنع','يجوع','يضطهد'],answer:0},{q:'The work ___ done.',options:['has been','have','is be'],answer:0},{q:'survive means:',options:['ينجو','يهرب','يمنع'],answer:0}]},
];

function formatProgress(done:number,total:number){ const pct=total===0?0:Math.round(done/total*100); return `تقدمك: ${done} / ${total} - ${pct}%`; }
function LogoImg({size=108,radius='50%'}:{size?:number;radius?:string}){
  const [failed,setFailed]=useState(false);
  if(failed) return <div role="img" aria-label="شعار مدرسة التابعين الشرعية" style={{width:size,height:size,borderRadius:radius,background:'linear-gradient(135deg,#1e7bff,#2563eb)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:Math.max(14,Math.round(size/5)),textAlign:'center',padding:6,boxShadow:'0 10px 30px rgba(0,0,0,.25)'}}>التابعين</div>;
  return <img src={logoUrl} alt="شعار مدرسة التابعين الشرعية" width={size} height={size} onError={()=>setFailed(true)} style={{width:size,height:size,borderRadius:radius,objectFit:'cover',background:'#fff',padding:5,boxShadow:'0 10px 30px rgba(0,0,0,.25)'}} />;
}
class ErrorBoundary extends React.Component<{children:React.ReactNode},{hasError:boolean}>{
  constructor(props:any){ super(props); this.state={hasError:false}; }
  static getDerivedStateFromError(){ return {hasError:true}; }
  componentDidCatch(){ /* swallowed so a render error never leaves a blank page */ }
  render(){
    if(this.state.hasError) return <div dir="rtl" lang="ar" style={{minHeight:'100vh',padding:24,background:'var(--bg)',color:'var(--text)',textAlign:'center'}}><h2>حدث خطأ في العرض</h2><p style={{lineHeight:1.8}}>تم عرض هذه الرسالة بدلاً من صفحة فارغة. اضغط للعودة إلى الصفحة الرئيسية.</p><button onClick={()=>window.location.reload()} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:999,padding:'10px 16px',fontWeight:800,cursor:'pointer'}}>⬅️ العودة للرئيسية</button></div>;
    return this.props.children;
  }
}
const ALL_VOCAB=UNITS.flatMap(u=>u.vocab);
const TOTAL=120;
const TABS=['الرئيسية','الوحدات','المفردات','القواعد','القراءة','الاختبارات','المراجعة','المفضلة','التقدم','بحث'] as const;

async function api(action:string,args:any){
  const r=await fetch("actions",{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,args})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||j.error) throw new Error(j.error||('خطأ في الحفظ '+r.status));
  return j.data;
}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}

export default function App(){
  const [tab,setTab]=useState<string>('الرئيسية');
  const [dark,setDark]=useState(false);
  const [unitId,setUnitId]=useState(1);
  const [completed,setCompleted]=useState<string[]>([]);
  const [favVocab,setFavVocab]=useState<string[]>([]);
  const [favGrammar,setFavGrammar]=useState<string[]>([]);
  const [history,setHistory]=useState<any[]>([]);
  const [mistakes,setMistakes]=useState<any[]>([]);
  const [recordId,setRecordId]=useState<string|null>(null);
  const [saveMsg,setSaveMsg]=useState('');
  const [loadError,setLoadError]=useState('');
  const [showReset,setShowReset]=useState(false);
  const [search,setSearch]=useState('');
  const [vocabUnit,setVocabUnit]=useState(0);
  const [hideMeaning,setHideMeaning]=useState(false);
  const [flash,setFlash]=useState<{list:Vocab[];i:number;show:boolean}|null>(null);
  const [quiz,setQuiz]=useState<any|null>(null);
  const [grammarAnswers,setGrammarAnswers]=useState<Record<string,number>>({});
  const [readingAnswers,setReadingAnswers]=useState<Record<string,number|boolean>>({});
  const [showReading,setShowReading]=useState<Record<string,boolean>>({});
  const [expandedPeriod,setExpandedPeriod]=useState<Record<number,boolean>>({});
  const saving=useRef(false);
  const loaded=useRef(false);
  // Dark/light mode: class + data-theme on <html> so CSS variables apply everywhere.
  useEffect(()=>{ document.documentElement.dataset.theme=dark?'dark':'light'; document.documentElement.classList.toggle('dark',dark); document.documentElement.classList.toggle('light',!dark); },[dark]);
  // Event delegation: lesson/home clicks work even if an element was not present at load.
  useEffect(()=>{
    const handler=(e:any)=>{
      const unitEl=e.target?.closest?.('[data-unit-open]');
      if(unitEl){ const id=Number(unitEl.getAttribute('data-unit-open')); if(Number.isFinite(id)){ setUnitId(id); setTab('الوحدات'); window.scrollTo({top:0}); } return; }
      const homeEl=e.target?.closest?.('[data-nav-home]');
      if(homeEl){ setTab('الرئيسية'); window.scrollTo({top:0}); }
    };
    document.addEventListener('click',handler);
    return ()=>document.removeEventListener('click',handler);
  },[]);

  useEffect(()=>{ (async()=>{
    try{
      const d:any=await api('records.list',{collection:'english10_state'});
      const rec=d?.records?.[0];
      if(rec){ setRecordId(rec.id); const v=rec.value||{}; setDark(!!v.dark); setCompleted(v.completed||[]); setFavVocab(v.favVocab||[]); setFavGrammar(v.favGrammar||[]); setHistory(v.history||[]); setMistakes(v.mistakes||[]); }
    }catch(e){ setLoadError('تعذّر تحميل الحفظ السابق — سيعمل التطبيق الآن، وسيُحاول الحفظ عند كل تغيير.'); }
    loaded.current=true;
  })(); },[]);

  async function persist(next:any){
    if(!loaded.current||saving.current) return;
    saving.current=true;
    try{
      const value={dark,completed,favVocab,favGrammar,history,mistakes,...next};
      if(recordId){ await api('records.replace',{collection:'english10_state',id:recordId,value}); }
      else { const rec:any=await api('records.create',{collection:'english10_state',value,idempotency_key:'english10-'+uid()}); if(rec?.id) setRecordId(rec.id); }
      setSaveMsg('✅ تم الحفظ تلقائيًا');
      setTimeout(()=>setSaveMsg(''),2200);
    }catch(e:any){ setSaveMsg('⚠️ تعذّر الحفظ الآن — سيُعاد المحاولة عند التغيير التالي'); }
    saving.current=false;
  }
  // persist on changes after load
  useEffect(()=>{ if(loaded.current) persist({dark,completed,favVocab,favGrammar,history,mistakes}); },[dark,completed,favVocab,favGrammar,history,mistakes]);

  function toggleComplete(id:string){ setCompleted(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); }
  function toggleFavVocab(en:string){ setFavVocab(p=>p.includes(en)?p.filter(x=>x!==en):[...p,en]); }
  function toggleFavGrammar(t:string){ setFavGrammar(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]); }
  function speak(text:string){ try{ const u=new SpeechSynthesisUtterance(text); u.lang='en-GB'; u.rate=.85; speechSynthesis.cancel(); speechSynthesis.speak(u);}catch{} }
  function copyText(text:string, e:any){ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy'); setSaveMsg('✅ تم النسخ'); setTimeout(()=>setSaveMsg(''),1800);}catch{} ta.remove(); }

  const progress=TOTAL===0?0:Math.min(100,Math.round(completed.length/TOTAL*100));
  const lessonNotFound=!UNITS.some(u=>u.id===unitId);
  const unit=UNITS.find(u=>u.id===unitId) ?? UNITS[0];
  const filteredVocab=ALL_VOCAB.filter(v=>(vocabUnit===0||v.unit===vocabUnit)&&(!search||v.en.includes(search.toLowerCase())||v.ar.includes(search)));
  const searchUnits=UNITS.filter(u=>search&&(u.title.toLowerCase().includes(search.toLowerCase())||u.titleAr.includes(search)||u.focus.includes(search)));
  const best=Math.max(0,...history.map((h:any)=>h.score));
  const favVocabList=ALL_VOCAB.filter(v=>favVocab.includes(v.en));

  function startQuiz(title:string,questions:any[],kind:string){
    const qs=[...questions].sort(()=>Math.random()-.5);
    setQuiz({title,kind,questions:qs,index:0,answers:Array(qs.length).fill(null),finished:false});
    setTab('الاختبارات'); window.scrollTo({top:0,behavior:'smooth'});
  }
  function finishQuiz(){
    const q=quiz; const correct=q.questions.filter((qq:any,i:number)=>q.answers[i]===qq.answer).length;
    const score=Math.round(correct/q.questions.length*100);
    const wrong=q.questions.filter((qq:any,i:number)=>q.answers[i]!==qq.answer).map((qq:any)=>({q:qq.q,unit:unitId}));
    setHistory(h=>[{title:q.title,score,correct,total:q.questions.length,date:new Date().toLocaleDateString('ar')},...h].slice(0,30));
    setMistakes(m=>[...wrong,...m].slice(0,60));
    setQuiz({...q,finished:true,score,correct});
    toggleComplete('quiz-'+q.title);
  }
  async function doReset(){
    setCompleted([]); setFavVocab([]); setFavGrammar([]); setHistory([]); setMistakes([]);
    if(recordId){ try{ await api('records.delete',{collection:'english10_state',id:recordId}); setRecordId(null);}catch{} }
    setShowReset(false); setSaveMsg('تم مسح التقدم والبدء من جديد'); setTab('الرئيسية');
  }

  const card={background:'var(--surface)',border:'1px solid var(--line)',borderRadius:18,boxShadow:'var(--card-shadow)'};
  const btn=(bg='#2563eb',color='#fff')=>({background:bg,color,border:'none',borderRadius:999,padding:'10px 16px',fontWeight:800,cursor:'pointer'});
  const pill={background:'var(--surface)',border:'1px solid var(--line)',borderRadius:999,padding:'8px 14px',fontWeight:700,boxShadow:'var(--card-shadow)',fontSize:14};

  return <ErrorBoundary><div dir="rtl" lang="ar" data-theme={dark?'dark':'light'} data-safe-area-inset-root style={{boxSizing:'border-box',paddingTop:'var(--safe-area-inset-top)',minHeight:'100vh',background:'var(--bg)',color:'var(--text)',overflowX:'clip'}}>
    {/* HEADER */}
    <header style={{background:'linear-gradient(135deg,#1e7bff,#2563eb)',color:'#fff',textAlign:'center',padding:'28px 16px 30px'}}>
      <LogoImg size={108} radius="50%" />
      <h1 style={{fontSize:'clamp(24px,6vw,44px)',fontWeight:900,margin:'14px 0 4px',lineHeight:1.2}}>اللغة الإنجليزية - الصف العاشر</h1>
      <div style={{fontSize:'clamp(17px,4vw,24px)',fontWeight:800}}>مدرسة التابعين الشرعية (أ)</div>
      <div style={{marginTop:8,fontWeight:700,opacity:.95}}>إشراف المعلم الفاضل: أ. سعيد السكافي | برمجة: بدر صبرة</div>
      <div style={{marginTop:14,display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
        <button onClick={()=>setDark(!dark)} style={btn('#fff','#1e293b')}>{dark?'☀️ وضع فاتح':'🌙 وضع داكن'}</button>
        <button data-nav-home onClick={()=>{setTab('الرئيسية');window.scrollTo({top:0})}} style={btn('#0f172a','#fff')}>🏠 الرئيسية</button>
      </div>
    </header>

    <div style={{maxWidth:1100,margin:'0 auto',padding:'0 14px 40px',minHeight:'60vh',visibility:'visible'}}>
      {/* badges */}
      <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:-14,position:'relative',zIndex:2}}>
        <span style={pill}>⭐ كلمات الرزمة 2024 - الوحدات 1-5 بالزبط</span><span style={pill}>📶 يعمل بدون إنترنت</span><span style={pill}>✏️ قواعد كاملة + شرح + أمثلة</span><span style={pill}>📋 60 سؤال + أسئلة قواعد</span><span style={pill}>💾 حفظ تلقائي</span>
      </div>

      {/* progress */}
      <section style={{...card,marginTop:18,padding:18}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}><b>{formatProgress(completed.length,TOTAL)}</b><span>{saveMsg||'✅ التقدم ينحفظ تلقائيًا مع كل جواب'}</span></div>
        <div style={{height:14,background:'var(--surface2)',border:'1px solid var(--line)',borderRadius:999,overflow:'hidden',marginTop:10}}><div style={{width:progress+'%',height:'100%',background:'linear-gradient(90deg,#22c55e,#1e7bff)',transition:'width .4s'}} /></div>
        <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.7,margin:'10px 0 0'}}>✅ التقدم ينحفظ تلقائيًا مع كل جواب، حتى لو سكّرت الصفحة ورجعت، لازم تفتح نفس الرابط ونفس الجهاز والمتصفح.</p>
        {loadError && <p style={{color:'#dc2626',fontSize:13}}>{loadError}</p>}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}}><button onClick={()=>setShowReset(true)} style={{...btn('#fff','#dc2626'),border:'2px solid #dc2626'}}>🗑️ مسح التقدم والبدء من جديد</button><button onClick={()=>setTab('التقدم')} style={btn('#0f172a')}>📊 لوحة التقدم</button></div>
      </section>

      {/* nav */}
      <nav data-safe-area-sticky-top style={{position:'sticky',top:'var(--safe-area-inset-top)',zIndex:20,background:'var(--bg)',padding:'12px 0'}} aria-label="التنقل">
        <div className="no-scrollbar" style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
          {TABS.map(t=><button key={t} onClick={()=>{setTab(t);window.scrollTo({top:0})}} style={{...btn(tab===t?'#2563eb':'var(--surface)',tab===t?'#fff':'var(--text)'),border:tab===t?'none':'1px solid var(--line)',whiteSpace:'nowrap'}}>{t}</button>)}
        </div>
      </nav>

      {showReset && <div style={{...card,padding:18,borderColor:'#dc2626',marginBottom:14}}><b>هل أنت متأكد من مسح كل التقدم والمفضلة وسجل الاختبارات؟</b><p style={{color:'var(--muted)'}}>لا يمكن التراجع عن هذا الإجراء.</p><div style={{display:'flex',gap:8}}><button onClick={doReset} style={btn('#dc2626')}>نعم، امسح وابدأ من جديد</button><button onClick={()=>setShowReset(false)} style={{...btn('var(--surface2)','var(--text)'),border:'1px solid var(--line)'}}>إلغاء</button></div></div>}

      {tab==='الرئيسية' && <div>
        <section style={{...card,padding:20,background:'linear-gradient(135deg,var(--surface),#dbeafe)',display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{flex:'1 1 280px'}}><h2 style={{fontSize:'clamp(22px,5vw,32px)',margin:'0 0 8px'}}>ابدأ من حيث توقفت 🎯</h2><p style={{lineHeight:1.8,color:'var(--muted)'}}>رزمة وزارة التربية والتعليم العالي – غزة 2024. عشر وحدات كاملة: مفردات، قواعد، قراءة، واختبارات. اختر وحدة، أكمل حصصها، واجمع تقدمك حتى 120 مهمة.</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}}><button onClick={()=>setTab('الوحدات')} style={btn()}>📚 افتح الوحدات</button><button onClick={()=>startQuiz('اختبار شامل - 20 سؤال',UNITS.flatMap(u=>u.quiz).slice(0,20),'شامل')} style={{...btn('#f59e0b','#111')}}>📋 ابدأ اختبارًا شاملًا</button></div></div>
          <LogoImg size={150} radius="20px" />
        </section>
        <h3 style={{margin:'22px 0 12px'}}>الوحدات العشر — اضغط على أي وحدة</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
          {UNITS.map(u=>{const done=[0,1,2,3].filter(i=>completed.includes(`u${u.id}-p${i}`)).length; return <article key={u.id} data-unit-open={u.id} onClick={()=>{setUnitId(u.id);setTab('الوحدات');window.scrollTo({top:0})}} style={{...card,padding:16,cursor:'pointer'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><span style={{background:'#2563eb',color:'#fff',borderRadius:999,padding:'4px 12px',fontWeight:800}}>الوحدة {u.id}</span><span>📘</span></div>
            <h4 style={{margin:'12px 0 4px',fontSize:19}}>{u.title}</h4><div style={{color:'var(--muted)'}}>{u.titleAr} • {u.vocab.length} كلمة</div><p style={{lineHeight:1.6,fontSize:14,overflowWrap:'anywhere'}}>{u.focus}</p>
            <div style={{height:8,background:'var(--surface2)',borderRadius:99,overflow:'hidden'}}><div style={{width:(done/4*100)+'%',height:'100%',background:'#22c55e'}} /></div><small>أُنجز {done} / 4 حصص</small>
          </article>})}
        </div>
        <section style={{...card,padding:18,marginTop:16}}><h3>لماذا هذا التطبيق؟</h3><ul style={{lineHeight:2}}><li>✔️ كل المحتوى من رزمة 2024 فقط، دون مفردات مخترعة.</li><li>✔️ بطاقات، نطق إنجليزي، إخفاء المعنى، ومفضلة.</li><li>✔️ اختبارات فورية مع مراجعة الأخطاء.</li></ul></section>
      </div>}

      {tab==='الوحدات' && <div>
        {lessonNotFound && <div style={{...card,padding:18,marginBottom:12,borderColor:'#dc2626'}}><b>الدرس غير موجود</b><p style={{color:'var(--muted)',lineHeight:1.8}}>لم نجد هذه الوحدة. عد إلى الصفحة الرئيسية واختر وحدة من الوحدات العشر.</p><button data-nav-home onClick={()=>{setTab('الرئيسية');window.scrollTo({top:0})}} style={btn()}>⬅️ العودة للرئيسية</button></div>}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>{UNITS.map(u=><button key={u.id} data-unit-open={u.id} onClick={()=>setUnitId(u.id)} style={{...btn(unitId===u.id?'#2563eb':'var(--surface)',unitId===u.id?'#fff':'var(--text)'),border:'1px solid var(--line)'}}>الوحدة {u.id}</button>)}</div>
        <section style={{...card,padding:20}}>
          <span style={{background:'#e0f2fe',color:'#075985',padding:'5px 12px',borderRadius:999,fontWeight:800}}>الوحدة {unit.id}</span>
          <h2 style={{fontSize:'clamp(22px,5vw,32px)',margin:'10px 0 4px'}}>{unit.title} — {unit.titleAr}</h2><p style={{color:'var(--muted)',lineHeight:1.7}}>{unit.focus}</p>
          <h3>الحصص 1-4</h3>
          {unit.periods.map((p,i)=>{const id=`u${unit.id}-p${i}`; const done=completed.includes(id); return <div key={i} style={{border:'1px solid var(--line)',borderRadius:14,padding:14,marginBottom:8,background:'var(--surface2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}><b>الحصة {i+1}: {p}</b><button onClick={()=>toggleComplete(id)} style={btn(done?'#16a34a':'#2563eb')}>{done?'✅ مكتملة':'✓ علّم كمكتملة'}</button></div>
            {expandedPeriod[unit.id*10+i] && <p style={{lineHeight:1.8}}>ركّز في هذه الحصة على: {p}. اقرأ الأمثلة بصوت عالٍ، اكتب 3 جمل من عندك، ثم أجب عن أسئلة الوحدة.</p>}
            <button onClick={()=>setExpandedPeriod(s=>({...s,[unit.id*10+i]:!s[unit.id*10+i]}))} style={{...btn('transparent','var(--text)'),padding:'6px 0'}}>{expandedPeriod[unit.id*10+i]?'إخفاء التفاصيل ▲':'عرض التفاصيل ▼'}</button>
          </div>})}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
            <button onClick={()=>setTab('المفردات')} style={btn()}>📖 مفردات الوحدة ({unit.vocab.length})</button>
            <button onClick={()=>setTab('القواعد')} style={btn('#7c3aed')}>✏️ قواعد الوحدة</button>
            <button onClick={()=>setTab('القراءة')} style={btn('#059669')}>📚 قراءة الوحدة</button>
            <button onClick={()=>startQuiz(`اختبار الوحدة ${unit.id}`,unit.quiz,'وحدة')} style={{...btn('#f59e0b','#111')}}>📋 اختبار الوحدة</button>
            <button onClick={()=>{setFlash({list:unit.vocab,i:0,show:false});setTab('المراجعة')}} style={btn('#0f172a')}>🃏 بطاقات الوحدة</button>
          </div>
          <div style={{marginTop:14}}><button onClick={()=>toggleComplete(`u${unit.id}-complete`)} style={btn(completed.includes(`u${unit.id}-complete`)?'#16a34a':'#2563eb')}>{completed.includes(`u${unit.id}-complete`)?'✅ الوحدة مكتملة':'✓ إتمام الوحدة كاملة'}</button></div>
        </section>
      </div>}

      {tab==='المفردات' && <div>
        <div style={{...card,padding:16,display:'flex',gap:8,flexWrap:'wrap'}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث بكلمة إنجليزية أو عربية..." style={{flex:'1 1 220px',padding:12,borderRadius:12,border:'1px solid var(--line)',background:'var(--surface2)',color:'var(--text)'}} />
        <select value={vocabUnit} onChange={e=>setVocabUnit(Number(e.target.value))} style={{padding:12,borderRadius:12,border:'1px solid var(--line)',background:'var(--surface)',color:'var(--text)'}}><option value={0}>كل الوحدات</option>{UNITS.map(u=><option key={u.id} value={u.id}>الوحدة {u.id} - {u.titleAr}</option>)}</select>
        <button onClick={()=>setHideMeaning(!hideMeaning)} style={btn('#7c3aed')}>{hideMeaning?'👁️ إظهار المعاني':'🙈 إخفاء المعاني'}</button>
        <button onClick={()=>{if(filteredVocab.length){setFlash({list:filteredVocab,i:0,show:false});setTab('المراجعة')}}} style={btn('#0f172a')}>🃏 بطاقات المفلترة</button></div>
        <p style={{color:'var(--muted)'}}>النتائج: {filteredVocab.length} كلمة • اضغط 🔊 للنطق، ⭐ للمفضلة، 📋 للنسخ.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
          {filteredVocab.map(v=>{const fav=favVocab.includes(v.en); return <article key={v.en+v.unit} style={{...card,padding:16}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:20,overflowWrap:'anywhere'}}>{v.en}</b><span style={{background:'#dbeafe',color:'#1e40af',padding:'2px 10px',borderRadius:999,fontSize:12}}>وحدة {v.unit}</span></div>
            <div style={{fontSize:18,margin:'10px 0',minHeight:28}}>{hideMeaning?'••••••':v.ar}</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}><button onClick={()=>speak(v.en)} style={btn('#2563eb')}>🔊 نطق</button><button onClick={()=>toggleFavVocab(v.en)} style={btn(fav?'#f59e0b':'var(--surface2)',fav?'#111':'var(--text)')}>{fav?'⭐ محفوظة':'☆ مفضلة'}</button><button onClick={(e)=>copyText(`${v.en} = ${v.ar}`,e)} style={{...btn('var(--surface2)','var(--text)'),border:'1px solid var(--line)'}}>📋 نسخ</button><button onClick={()=>toggleComplete('vocab-'+v.en)} style={btn(completed.includes('vocab-'+v.en)?'#16a34a':'var(--surface2)',completed.includes('vocab-'+v.en)?'#fff':'var(--text)')}>{completed.includes('vocab-'+v.en)?'✅ حُفظت':'✓ أتقنتها'}</button></div>
          </article>})}
        </div>
        {filteredVocab.length===0 && <p style={{...card,padding:20,textAlign:'center'}}>لا نتائج. جرّب كلمة أخرى أو اختر كل الوحدات.</p>}
      </div>}

      {tab==='القواعد' && <div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>{UNITS.map(u=><button key={u.id} onClick={()=>setUnitId(u.id)} style={{...btn(unitId===u.id?'#2563eb':'var(--surface)',unitId===u.id?'#fff':'var(--text)'),border:'1px solid var(--line)'}}>وحدة {u.id}</button>)}</div>
        {unit.grammar.map((g,gi)=>{const key=`g-${unit.id}-${gi}`; const fav=favGrammar.includes(key); return <section key={key} style={{...card,padding:20,marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}><h3 style={{margin:0}}>{g.title}</h3><button onClick={()=>toggleFavGrammar(key)} style={btn(fav?'#f59e0b':'var(--surface2)',fav?'#111':'var(--text)')}>{fav?'⭐ مفضلة':'☆ أضف للمفضلة'}</button></div>
          <p style={{lineHeight:1.9}}>{g.explain}</p>
          <div style={{background:'var(--surface2)',border:'1px solid var(--line)',borderRadius:12,padding:14}}><b>الصيغة:</b> <span dir="ltr" style={{display:'inline-block',overflowWrap:'anywhere'}}>{g.form}</span></div>
          <ul style={{lineHeight:1.9}}>{g.examples.map((ex,i)=><li key={i} dir="ltr" style={{textAlign:'left',overflowWrap:'anywhere'}}>{ex} <button onClick={()=>speak(ex)} style={{border:'none',background:'transparent',cursor:'pointer'}}>🔊</button></li>)}</ul>
          <button onClick={()=>setShowReading(s=>({...s,[key]:!s[key]}))} style={btn('#7c3aed')}>{showReading[key]?'إخفاء الأسئلة ▲':'اختبر نفسك: سؤالان ▼'}</button>
          {showReading[key] && <div style={{marginTop:12}}>{g.quiz.map((q,qi)=>{const ak=`${key}-${qi}`; const sel=grammarAnswers[ak]; return <div key={qi} style={{border:'1px solid var(--line)',borderRadius:12,padding:12,marginBottom:8}}><b>{q.q}</b><div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>{q.options.map((o,oi)=><button key={oi} onClick={()=>setGrammarAnswers(s=>({...s,[ak]:oi}))} style={{...btn(sel===oi?(oi===q.answer?'#16a34a':'#dc2626'):'var(--surface2)',sel===oi?'#fff':'var(--text)'),border:'1px solid var(--line)'}}>{o}</button>)}</div>{sel!==undefined && <p>{sel===q.answer?'✅ صحيح! أحسنت.':'❌ حاول مرة أخرى — الإجابة الصحيحة: '+q.options[q.answer]}</p>}</div>})}</div>}
        </section>})}
      </div>}

      {tab==='القراءة' && <div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>{UNITS.map(u=><button key={u.id} onClick={()=>setUnitId(u.id)} style={{...btn(unitId===u.id?'#2563eb':'var(--surface)',unitId===u.id?'#fff':'var(--text)'),border:'1px solid var(--line)'}}>وحدة {u.id}</button>)}</div>
        <section style={{...card,padding:20}}><h2>{unit.readingTitle}</h2><p style={{lineHeight:2,fontSize:17,overflowWrap:'anywhere'}}>{unit.reading}</p>
        <button onClick={()=>toggleComplete('reading-'+unit.id)} style={btn(completed.includes('reading-'+unit.id)?'#16a34a':'#2563eb')}>{completed.includes('reading-'+unit.id)?'✅ قرأتها':'✓ علّم كمقروءة'}</button>
        <h3>أسئلة الفهم</h3>{unit.comprehension.map((q,i)=>{const ak=`read-${unit.id}-${i}`; const sel=readingAnswers[ak] as number|undefined; return <div key={i} style={{border:'1px solid var(--line)',borderRadius:12,padding:12,marginBottom:8}}><b>{q.q}</b><div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>{q.options.map((o,oi)=><button key={oi} onClick={()=>setReadingAnswers(s=>({...s,[ak]:oi}))} style={{...btn(sel===oi?(oi===q.answer?'#16a34a':'#dc2626'):'var(--surface2)',sel===oi?'#fff':'var(--text)'),border:'1px solid var(--line)'}}>{o}</button>)}</div>{sel!==undefined && <p>{sel===q.answer?'✅ صحيح':'❌ الإجابة الصحيحة: '+q.options[q.answer]}</p>}</div>})}
        <h3>صح / خطأ</h3>{unit.tf.map((q,i)=>{const ak=`tf-${unit.id}-${i}`; const sel=readingAnswers[ak] as boolean|undefined; return <div key={i} style={{border:'1px solid var(--line)',borderRadius:12,padding:12,marginBottom:8}}><b>{q.q}</b><div style={{display:'flex',gap:6,marginTop:8}}><button onClick={()=>setReadingAnswers(s=>({...s,[ak]:true}))} style={btn(sel===true?(q.answer?'#16a34a':'#dc2626'):'var(--surface2)',sel===true?'#fff':'var(--text)')}>✔️ صح</button><button onClick={()=>setReadingAnswers(s=>({...s,[ak]:false}))} style={btn(sel===false?(!q.answer?'#16a34a':'#dc2626'):'var(--surface2)',sel===false?'#fff':'var(--text)')}>✖️ خطأ</button></div>{sel!==undefined && <p>{sel===q.answer?'✅ صحيح':'❌ الإجابة الصحيحة: '+(q.answer?'صح':'خطأ')}</p>}</div>})}
        <button onClick={()=>setShowReading(s=>({...s,['ans-'+unit.id]:!s['ans-'+unit.id]}))} style={btn('#0f172a')}>{showReading['ans-'+unit.id]?'إخفاء الإجابات':'إظهار كل الإجابات'}</button>
        {showReading['ans-'+unit.id] && <div style={{marginTop:12,background:'var(--surface2)',padding:14,borderRadius:12,lineHeight:2}}><b>الإجابات:</b><br/>{unit.comprehension.map((q,i)=><div key={i}>• {q.options[q.answer]}</div>)}{unit.tf.map((q,i)=><div key={i}>• {q.answer?'صح':'خطأ'}</div>)}</div>}
        </section>
      </div>}

      {tab==='الاختبارات' && <div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}><button onClick={()=>startQuiz('اختبار شامل - 20 سؤال',UNITS.flatMap(u=>u.quiz).slice(0,20),'شامل')} style={btn()}>📋 شامل (20)</button><button onClick={()=>startQuiz('اختبار مفردات - 15 سؤال',ALL_VOCAB.slice(0,15).map(v=>({q:`ما معنى ${v.en}؟`,options:[v.ar,...ALL_VOCAB.filter(x=>x.ar!==v.ar).slice(0,2).map(x=>x.ar)],answer:0})),'مفردات')} style={btn('#7c3aed')}>📖 مفردات (15)</button><button onClick={()=>startQuiz('اختبار قواعد - 15 سؤال',UNITS.flatMap(u=>u.grammar.flatMap(g=>g.quiz)).slice(0,15),'قواعد')} style={btn('#059669')}>✏️ قواعد (15)</button>{UNITS.map(u=><button key={u.id} onClick={()=>startQuiz(`اختبار الوحدة ${u.id}`,u.quiz,'وحدة')} style={{...btn('var(--surface)','var(--text)'),border:'1px solid var(--line)'}}>وحدة {u.id} ({u.quiz.length})</button>)}</div>
        {!quiz && <p style={{...card,padding:20}}>اختر اختبارًا بالأعلى. كل اختبار: سؤال واحد في كل مرة، تنقّل بين الأسئلة، ثم النتيجة والمراجعة وإعادة المحاولة.</p>}
        {quiz && !quiz.finished && <section style={{...card,padding:20}}><div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}><b>{quiz.title}</b><span>السؤال {quiz.index+1} / {quiz.questions.length}</span></div>
        <div style={{height:10,background:'var(--surface2)',borderRadius:99,overflow:'hidden',margin:'12px 0'}}><div style={{width:((quiz.index+1)/quiz.questions.length*100)+'%',height:'100%',background:'#2563eb'}} /></div>
        <h3 style={{lineHeight:1.7,overflowWrap:'anywhere'}}>{quiz.questions[quiz.index].q}</h3>
        <div style={{display:'grid',gap:8}}>{quiz.questions[quiz.index].options.map((o:number,oi:number)=>{const sel=quiz.answers[quiz.index]; return <button key={oi} onClick={()=>setQuiz({...quiz,answers:quiz.answers.map((a:any,i:number)=>i===quiz.index?oi:a)})} style={{...btn(sel===oi?'#2563eb':'var(--surface2)',sel===oi?'#fff':'var(--text)'),textAlign:'right',border:'1px solid var(--line)',overflowWrap:'anywhere'}}>{['أ','ب','ج','د'][oi] || oi+1}. {o}</button>})}</div>
        <div style={{display:'flex',gap:8,marginTop:14,flexWrap:'wrap'}}><button disabled={quiz.index===0} onClick={()=>setQuiz({...quiz,index:quiz.index-1})} style={{...btn('var(--surface2)','var(--text)'),opacity:quiz.index===0?.5:1}}>⬅️ السابق</button>{quiz.index<quiz.questions.length-1?<button onClick={()=>setQuiz({...quiz,index:quiz.index+1})} style={btn()}>التالي ➡️</button>:<button onClick={finishQuiz} style={btn('#16a34a')}>✅ إنهاء ورؤية النتيجة</button>}</div>
        <p style={{color:'var(--muted)'}}>أجبت على {quiz.answers.filter((a:any)=>a!==null).length} / {quiz.questions.length}</p></section>}
        {quiz?.finished && <section style={{...card,padding:20,textAlign:'center'}}><h2>نتيجتك: {quiz.score}% 🎉</h2><p style={{fontSize:20}}>صحيح: {quiz.correct} من {quiz.questions.length}</p><p>{quiz.score>=80?'ممتاز! استمر هكذا ⭐':quiz.score>=50?'جيد! راجع أخطاءك وجرّب مجددًا 💪':'لا بأس، المراجعة تصنع الفرق — أعد المحاولة 📚'}</p>
        <div style={{textAlign:'right',marginTop:14}}><h3>مراجعة الإجابات</h3>{quiz.questions.map((q:any,i:number)=><div key={i} style={{border:'1px solid var(--line)',borderRadius:12,padding:12,marginBottom:8}}><b>{i+1}. {q.q}</b><br/>إجابتك: {quiz.answers[i]!==null?q.options[quiz.answers[i]]:'—'} {quiz.answers[i]===q.answer?'✅':'❌'}<br/>الصحيحة: {q.options[q.answer]}</div>)}</div>
        <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}><button onClick={()=>startQuiz(quiz.title,quiz.questions,quiz.kind)} style={btn()}>🔁 إعادة المحاولة</button><button onClick={()=>setQuiz(null)} style={{...btn('var(--surface2)','var(--text)'),border:'1px solid var(--line)'}}>اختبار آخر</button></div></section>}
        {history.length>0 && <section style={{...card,padding:16,marginTop:14}}><h3>سجل الاختبارات</h3>{history.slice(0,8).map((h:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--line)'}}><span>{h.title} • {h.date}</span><b>{h.score}% ({h.correct}/{h.total})</b></div>)}</section>}
      </div>}

      {tab==='المراجعة' && <div>
        {!flash && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:12}}>
          <button onClick={()=>setFlash({list:ALL_VOCAB,i:0,show:false})} style={{...card,padding:20,cursor:'pointer',color:'var(--text)'}}>🃏 بطاقات كل المفردات<br/><small>{ALL_VOCAB.length} بطاقة</small></button>
          <button onClick={()=>setFlash({list:favVocabList.length?favVocabList:ALL_VOCAB.slice(0,10),i:0,show:false})} style={{...card,padding:20,cursor:'pointer',color:'var(--text)'}}>⭐ بطاقات المفضلة<br/><small>{favVocabList.length} بطاقة</small></button>
          <button onClick={()=>setFlash({list:unit.vocab,i:0,show:false})} style={{...card,padding:20,cursor:'pointer',color:'var(--text)'}}>📖 بطاقات الوحدة {unit.id}<br/><small>{unit.vocab.length} بطاقة</small></button>
        </div>}
        {flash && <section style={{...card,padding:22,textAlign:'center',maxWidth:560,margin:'0 auto'}}>
          <div style={{color:'var(--muted)'}}>بطاقة {flash.i+1} / {flash.list.length} • وحدة {flash.list[flash.i].unit}</div>
          <div onClick={()=>setFlash({...flash,show:!flash.show})} style={{background:'linear-gradient(135deg,#2563eb,#7c3aed)',color:'#fff',borderRadius:20,padding:'42px 16px',margin:'16px 0',cursor:'pointer',minHeight:170}}>
            <div style={{fontSize:34,fontWeight:900,overflowWrap:'anywhere'}}>{flash.list[flash.i].en}</div>
            <div style={{fontSize:24,marginTop:12}}>{flash.show?flash.list[flash.i].ar:'اضغط لإظهار المعنى 👀'}</div>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}><button onClick={()=>speak(flash.list[flash.i].en)} style={btn()}>🔊 نطق</button><button onClick={()=>toggleFavVocab(flash.list[flash.i].en)} style={btn('#f59e0b','#111')}>⭐ مفضلة</button><button onClick={()=>toggleComplete('vocab-'+flash.list[flash.i].en)} style={btn('#16a34a')}>✓ أتقنتها</button></div>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:14}}><button disabled={flash.i===0} onClick={()=>setFlash({...flash,i:flash.i-1,show:false})} style={{...btn('var(--surface2)','var(--text)'),opacity:flash.i===0?.5:1}}>⬅️ السابقة</button><button disabled={flash.i>=flash.list.length-1} onClick={()=>setFlash({...flash,i:flash.i+1,show:false})} style={{...btn('var(--surface2)','var(--text)'),opacity:flash.i>=flash.list.length-1?.5:1}}>التالية ➡️</button><button onClick={()=>setFlash(null)} style={btn('#0f172a')}>إنهاء</button></div>
        </section>}
        <section style={{...card,padding:18,marginTop:16}}><h3>❌ أخطاؤك الأخيرة — راجعها</h3>{mistakes.length===0?<p>لا أخطاء بعد. أكمل اختبارًا وستظهر هنا أسئلتك الخاطئة.</p>:mistakes.slice(0,12).map((m:any,i:number)=><div key={i} style={{padding:'8px 0',borderBottom:'1px solid var(--line)',overflowWrap:'anywhere'}}>• {m.q}</div>)}</section>
      </div>}

      {tab==='المفضلة' && <div><h3>⭐ المفردات المفضلة ({favVocabList.length})</h3>{favVocabList.length===0?<p style={{...card,padding:20}}>لا مفضلة بعد. اضغط ☆ على أي كلمة.</p>:<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:12}}>{favVocabList.map(v=><article key={v.en} style={{...card,padding:16}}><b style={{fontSize:20}}>{v.en}</b><div style={{margin:'8px 0'}}>{v.ar} • وحدة {v.unit}</div><div style={{display:'flex',gap:6}}><button onClick={()=>speak(v.en)} style={btn()}>🔊</button><button onClick={()=>toggleFavVocab(v.en)} style={btn('#dc2626')}>حذف</button></div></article>)}</div>}
      <h3 style={{marginTop:20}}>✏️ القواعد المفضلة ({favGrammar.length})</h3>{favGrammar.length===0?<p>لا قواعد مفضلة بعد.</p>:favGrammar.map(f=><div key={f} style={{...card,padding:14,marginBottom:8,display:'flex',justifyContent:'space-between'}}><span>{f}</span><button onClick={()=>toggleFavGrammar(f)} style={btn('#dc2626')}>حذف</button></div>)}</div>}

      {tab==='التقدم' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{completed.length}/{TOTAL}</div><div>مهمة مكتملة</div></div>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{progress}%</div><div>نسبة التقدم</div></div>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{history.length}</div><div>اختبار مكتمل</div></div>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{best}%</div><div>أفضل نتيجة</div></div>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{favVocab.length+favGrammar.length}</div><div>عنصر مفضّل</div></div>
        <div style={{...card,padding:20}}><div style={{fontSize:34,fontWeight:900}}>{UNITS.filter(u=>completed.includes(`u${u.id}-complete`)).length}/10</div><div>وحدات مكتملة</div></div>
        <section style={{...card,padding:18,gridColumn:'1 / -1'}}><h3>سجل الاختبارات</h3>{history.length===0?<p>لا سجل بعد.</p>:history.map((h:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--line)'}}><span>{h.title} • {h.date}</span><b>{h.score}%</b></div>)}</section>
      </div>}

      {tab==='بحث' && <div><div style={{...card,padding:16}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث في كل شيء: كلمة، قاعدة، وحدة، قراءة..." style={{width:'100%',padding:14,borderRadius:12,border:'1px solid var(--line)',background:'var(--surface2)',color:'var(--text)',boxSizing:'border-box'}} /></div>
        {!search && <p style={{color:'var(--muted)',marginTop:12}}>اكتب كلمة للبحث في المفردات والوحدات والقواعد.</p>}
        {search && <div style={{marginTop:14}}><h3>مفردات ({filteredVocab.length})</h3><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:10}}>{filteredVocab.slice(0,20).map(v=><div key={v.en} style={{...card,padding:14}}><b>{v.en}</b><div>{v.ar}</div><button onClick={()=>speak(v.en)} style={{...btn(),marginTop:8}}>🔊</button></div>)}</div>
        <h3>وحدات ({searchUnits.length})</h3>{searchUnits.map(u=><div key={u.id} onClick={()=>{setUnitId(u.id);setTab('الوحدات')}} style={{...card,padding:14,marginBottom:8,cursor:'pointer'}}><b>الوحدة {u.id}: {u.title} — {u.titleAr}</b><div>{u.focus}</div></div>)}
        <h3>قواعد</h3>{UNITS.flatMap(u=>u.grammar.map(g=>({u,g}))).filter(x=>x.g.title.includes(search)||x.g.explain.includes(search)).slice(0,10).map((x,i)=><div key={i} onClick={()=>{setUnitId(x.u.id);setTab('القواعد')}} style={{...card,padding:14,marginBottom:8,cursor:'pointer'}}><b>{x.g.title}</b><div>وحدة {x.u.id}</div></div>)}</div>}
      </div>}
    </div>

    <footer style={{background:'#0f172a',color:'#e2e8f0',padding:'28px 16px',textAlign:'center'}}>
      <LogoImg size={86} radius="50%" />
      <p style={{lineHeight:1.9,maxWidth:800,margin:'12px auto'}}>📶 تعمل الدروس بلا إنترنت، وتُحفظ تقدّمك تلقائيًا على هذا الجهاز. للعودة لهذه الصفحة من أي درس: زر ⬅️ أعلى الدرس، أو زر الرجوع في الجوال.</p>
      <p>مدرسة التابعين الشرعية (أ) • إشراف: أ. سعيد السكافي • برمجة: بدر صبرة</p>
      <p style={{color:'#a5b4cc',fontSize:14}}>المصدر: رزمة وزارة التربية والتعليم العالي – غزة 2024 – English for Palestine 10 Learning Modules</p>
      <a href="https://www.moe.edu.ps/gaza/subjects" target="_blank" rel="noopener" style={{color:'#93c5fd',fontWeight:800}}>الموقع الرسمي: moe.edu.ps/gaza/subjects ↗</a>
      <div style={{marginTop:12}}><button data-nav-home onClick={()=>{setTab('الرئيسية');window.scrollTo({top:0})}} style={btn('#fff','#0f172a')}>⬅️ العودة للرئيسية</button></div>
    </footer>
  </div></ErrorBoundary>;
}
