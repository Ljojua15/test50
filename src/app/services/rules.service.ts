import { Injectable } from '@angular/core';
import { Rule } from '../models/rule';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  constructor() {}

  title = {
    en: 'RULES:',
    ge: 'წესები:',
    ru: 'ПРАВИЛА:',
  };

  // rules: Rule[] = [
  //   {
  //     en: {
  //       question: '“WHAT IS “DOUBLE WHEEL OF UFO”?',
  //       answer: `<p class="answer">“Double wheel of UFO” is a promotion of Crocobet allowing you to make 5-level progress while placing
  //          a bet in UFO, spin the double wheel and win 1 000 EGT freespins of 1₾;</p>`,
  //     },
  //     ge: {
  //       question: 'რა არის „UFO-ს ორმაგი ბორბალი?“',
  //       answer: `<p class="answer">„UFO-ს ორმაგი ბორბალი“ არის კროკობეთის აქცია, რომელიც
  //  საშუალებას გაძლევს UFO-ში ფსონის განთავსებასთან ერთად შეასრულო 5-დონიანი პროგრესი, დაატრიალო ორმაგი ბორბალი და მოიგო 1 000 ცალი 1-ლარიანი EGT ფრისპინი;</p>`,
  //     },
  //     ru: {
  //       question: 'ЧТО ТАКОЕ "ДВОЙНОЕ КОЛЕСО UFO"?',
  //       answer: `<p class="answer">"Двойное колесо UFO" - это акция от Crocobet, которая
  //  позволяет тебе во время размещения ставки в UFO сделать 5-уровневый прогресс, вращать двойное колесо и выиграть 1 000 EGT фриспинов по 1₾;</p>`,
  //     },
  //   },
  //   {
  //     en: {
  //       question: 'WHEN DOES THE PROMOTION START AND END?',
  //       answer: `<p class="answer">The promotion starts on April 18, at 12:00 and ends on May 8, at 23:59;</p>`,
  //     },
  //     ge: {
  //       question: 'როდის იწყება და მთავრდება აქცია?',
  //       answer: `<p class="answer">აქცია იწყება 18 აპრილს, 12:00 საათზე და მთავრდება 8 მაისს, 23:59 საათზე;</p>`,
  //     },
  //     ru: {
  //       question: 'КОГДА НАЧИНАЕТСЯ И ЗАКАНЧИВАЕТСЯ АКЦИЯ?',
  //       answer: `<p class="answer">Акция начинается 18 апреля в 12:00 и заканчивается 8 мая в 23:59;</p>`,
  //     },
  //   },
  //   {
  //     en: {
  //       question: 'HOW CAN I GET A CHANCE TO SPIN BOTH WHEELS?',
  //       answer: `<p class="answer">You have 5 types of progress for spinning both wheels of UFO: 50₾, 250₾, 500₾, 1 000₾,
  //                   2 500₾;<br><br>To fill each progress, you need to spin the amount indicated for particular progress in
  //                   UFO.<br><br>For example, to fill 50₾ progress, you must place a total of 50₾ in the UFO and after
  //                   that, you will be able to spin the wheel and get the appropriate prize.<br><br>You can spin both
  //                   wheels a maximum of 5 times during the day. On 50₾, 250₾ and 500₾ progress, you spin the first wheel,
  //                   on 1 000₾ and 2 500₾ progress - the second wheel. If the key of the second (golden) wheel comes out on
  //                   the first wheel, you will be able to use the chance to bonus spin;<br><br>If you don&#x27;t spin any
  //                   wheel during the day, the chance to spin them will be canceled at the end of the day and you will not
  //                   be able to use it the next day;<br>‍<br>You can spin both wheels every day and the counting of the day
  //                   starts from 05:00 to 04:59;<br>‍<br>*The min. coefficient of cashout is 2.00 in UFO;<br>*Min. bet is
  //                   not limited;<br>*Winning and losing bets are counted in the progress.;</p>`,
  //     },
  //     ge: {
  //       question: 'როგორ მივიღო UFO-ს ორივე ბორბლის დატრიალების შანსი?',
  //       answer: `
  //                   <p class="answer">UFO-ს ორივე ბორბლის დასატრიალებლად მოცემული გაქვს 5 ტიპის პროგრესი: 50₾, 250₾, 500₾, 1
  //                   000₾, 2 500₾;<br><br>თითოეული პროგრესის შესავსებად, UFO-ში ჯამურად უნდა განათავსო კონკრეტულ პროგრესზე
  //                   მითითებული თანხა.<br>‍<br>მაგ: 50₾ პროგრესის შესავსებად UFO-ში ჯამურად უნდა განათავსო 50₾, რის
  //                   შემდეგაც შეძლებ ბორბლის დატრიალებას და შესაბამისი პრიზის მიღებას;<br><br>დღის განმავლობაში ორივე
  //                   ბორბლის დატრიალება შესაძლებელია ჯამში მაქსიმუმ 5-ჯერ. 50₾, 250₾ და 500₾-იან პროგრესზე ატრიალებ პირველ
  //                   ბორბალს, ხოლო 1 000₾ და 2 5000₾-იან პროგრესზე - მეორე ბორბალს. თუ პირველ ბორბალზე ამოგივა მეორე
  //                   (ოქროს) ბორბლის გასაღები, მაშინ შეგიძლია ბონუს დატრიალების შანსი გამოიყენო;<br><br>იმ შემთხვევაში, თუ
  //                   დღის განმავლობაში არ დაატრიალებ UFO-ს ორივე ბორბალს, მათი დატრიალების შანსი დღის ბოლოს გაგინულდება და
  //                   ვეღარ შეძლებ მომდევნო დღეს გამოყენებას;<br><br>ორივე ბორბლის დატრიალება შესაძლებელია ყოველდღე, ხოლო
  //                   დღის ჭრილის ათვლა იწყება 05:00 საათიდან - 04:59 საათამდე;<br><br>*განაღდების მინ. კოეფიციენტი UFO-ში
  //                   არის 2.00;<br>*ფსონის მინიმალური ოდენობა შეზღუდული არ არის;<br>*პროგრესში ითვლება როგორც მოგებული,
  //                   ასევე წაგებული ფსონები;</p>`,
  //     },
  //     ru: {
  //       question: 'КАК МНЕ ПОЛУЧИТЬ ШАНС ВРАЩАТЬ ОБА КОЛЕСА?',
  //       answer: ` <p class="answer">У тебя есть 5 типов прогресса для вращения двух колес: 50₾, 250₾, 500₾, 1 000₾, 2 500₾;<br>
  //                     <br>Чтобы заполнить каждый прогресс, ты должен вращать общую сумму, указанную для определенного прогресса в UFO:<br><br>Например, чтобы заполнить прогресс 50₾, ты должен поставить в общей сложности 50₾ в UFO, после чего ты сможешь крутить колесо и получить соответствующий приз;<br><br>Ты можешь вращать оба колеса максимум 5 раз в течение дня. На 50₾, 250₾ и 500₾ прогрессе ты вращаешь первое колесо, на 1 000₾ и 2 500₾ прогрессе - второе колесо. Если ключ второго (золотого) колеса выпадет на первом колесе, то ты сможешь использовать шанс на бонусное вращение;<br><br>Если ты не прокрутишь оба колеса в UFO в течение дня, то в конце дня шанс прокрутки будет анулирован, и ты не сможешь использовать его на следующий день;<br><br>Ты можешь вращать оба колеса каждый день, а отсчет дня начинается с 05:00 до 04:59;<br>‍<br>*Мин. коэффициент кешаута составляет 2.00 в UFO;<br>*Мин. ставка не ограничена;<br>* Выигранные и проигранные ставки учитываются в прогрессе;</p>`,
  //     },
  //   },
  //   {
  //     en: {
  //       question: 'HOW CAN I GET THE PRIZE?',
  //       answer: `<p class="answer"><strong>FIRST WHEEL</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>Category</strong></div>
  //                   <div><strong>Spinning number<br></strong></div>
  //                   <div><strong>Gift</strong></div>
  //                   <div>1</div>
  //                   <div>25, 50, 75, 100</div>
  //                   <div>A key of golden wheel<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT Freespins</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT Freespins</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT Freespins</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT Freespins</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT Freespins</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79, 82,
  //                     83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT Freespins</div>
  //                 </div>
  //                 <p class="answer">For example: if you spin the wheel 5th among the users, you will fall into the 2nd
  //                   category and get 500 EGT freespins as a gift. If your spin number is 96th, you will fall into the 6th
  //                   category and get the appropriate gift;<br><br>After every 100th spin, the queue starts again during
  //                   the day, the 101st user will fall into the same category as the first, and the 102nd will fall into
  //                   the same category as the second;</p>
  //                 <p class="answer"><strong>SECOND (GOLDEN) WHEEL</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>Category</strong></div>
  //                   <div><strong>Spinning number<br></strong></div>
  //                   <div><strong>Gift</strong></div>
  //                   <div>1</div>
  //                   <div>50, 100</div>
  //                   <div>1 000 EGT Freespins<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT Freespins</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT Freespins</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT Freespins</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT Freespins</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 75, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT Freespins</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 25, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79,
  //                     82, 83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT Freespins</div>
  //                 </div>
  //                 <p class="answer">For example: if you spin the wheel 2nd among the users, you will fall into the 3rd
  //                   category and get 200 EGT freespins as a gift. If your spin number is 97th, you will fall into the 7th
  //                   category and get the appropriate gift;<br><br>During the day, after every 100th spin, the queue starts
  //                   again, the 101st user will fall into the same category as the first, and the 102nd will fall into the
  //                   same category as the second;</p>`,
  //     },
  //     ge: {
  //       question: 'რა პრინციპით მივიღებ საჩუქარს?',
  //       answer: `<p class="answer"><strong>პირველი ბორბალი:</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>კატეგორია</strong></div>
  //                   <div><strong>დატრიალების ნომერი<br></strong></div>
  //                   <div><strong>პრიზი</strong></div>
  //                   <div>1</div>
  //                   <div>25, 50, 75, 100</div>
  //                   <div>ოქროს ბორბლის გასაღები<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT ფრისპინი</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT ფრისპინი</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT ფრისპინი</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT ფრისპინი</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT ფრისპინი</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79, 82,
  //                     83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT ფრისპინი</div>
  //                 </div>
  //                 <p class="answer">მაგალითად: თუ შენი ბორბლის დატრიალება იქნება რიგით მე-5, მოხვდები მეორე კატეგორიაში და
  //                   საჩუქრად მიიღებ 500 EGT ფრისპინს. თუ შენი დატრიალების ნომერი იქნება რიგით 96-ე, მოხვდები მე-6
  //                   კატეგორიაში და მიიღებ შესაბამის საჩუქარს.<br><br>დღის ჭრილში, ყოველი მე-100 დატრიალების შემდეგ
  //                   რიგითობა იწყება თავიდან, ანუ 101-ე მომხმარებელი მოხვდება იგივე კატეგორიაში რომელშიც პირველი, ხოლო
  //                   102-ე მოხვდება იგივე კატეგორიაში, რომელშიც მეორე;</p>
  //                 <p class="answer"><strong>მეორე (ოქროს) ბორბალი</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>კატეგორია</strong></div>
  //                   <div><strong>დატრიალების ნომერი<br></strong></div>
  //                   <div><strong>პრიზი</strong></div>
  //                   <div>1</div>
  //                   <div>50, 100</div>
  //                   <div>1 000 EGT ფრისპინი<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT ფრისპინი</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT ფრისპინი</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT ფრისპინი</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT ფრისპინი</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 75, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT ფრისპინი</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 25, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79,
  //                     82, 83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT ფრისპინი</div>
  //                 </div>
  //                 <p class="answer">მაგალითად: თუ შენი ბორბლის დატრიალება იქნება რიგით მე-2, მოხვდები მესამე კატეგორიაში
  //                   და საჩუქრად მიიღებ 200 EGT ფრისპინს. თუ შენი დატრიალების ნომერი იქნება რიგით 97-ე, მოხვდები მე-7
  //                   კატეგორიაში და მიიღებ შესაბამის საჩუქარს.<br><br>დღის ჭრილში, ყოველი მე-100 დატრიალების შემდეგ
  //                   რიგითობა იწყება თავიდან, ანუ 101-ე მომხმარებელი მოხვდება იგივე კატეგორიაში რომელშიც პირველი, ხოლო
  //                   102-ე მოხვდება იგივე კატეგორიაში, რომელშიც მეორე;</p>`,
  //     },
  //     ru: {
  //       question: 'КАК Я МОГУ ПОЛУЧИТЬ ПРИЗ?',
  //       answer: ` <p class="answer"><strong>ПЕРВОЕ КОЛЕСО:</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>Категория</strong></div>
  //                   <div><strong>Номер вращении<br></strong></div>
  //                   <div><strong>Приз</strong></div>
  //                   <div>1</div>
  //                   <div>25, 50, 75, 100</div>
  //                   <div>Ключ золотого колеса<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT фриспинов</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT фриспинов</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT фриспинов</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT фриспинов</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT фриспинов</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79, 82, 83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT фриспинов</div>
  //                 </div>
  //                 <p class="answer">Например: если ты будешь 5-м по счету, ты попадешь во 2-ю категорию и получишь 500 EGT фриспинов, Если номер вращении будет 96 -й по счету, ты попадешь в 6-ю категорию и получишь соответствующий подарок.<br><br>После каждых 100 спинов очередь начинается снова, 101-й пользователь попадает в ту же категорию, в которой первый, а 102-й попадает в ту же категорию, в которой второй.</p>
  //                 <p class="answer"><strong>ВТОРОЕ (ЗОЛОТОЕ) КОЛЕСО</strong></p>
  //                 <div class="w-layout-grid grid-2">
  //                   <div><strong>Категория</strong></div>
  //                   <div><strong>Номер вращении<br></strong></div>
  //                   <div><strong>Приз</strong></div>
  //                   <div>1</div>
  //                   <div>50, 100</div>
  //                   <div>1 000 EGT фриспинов<br></div>
  //                   <div>2</div>
  //                   <div>5, 15, 18, 20, 35, 54, 55</div>
  //                   <div>500 EGT фриспинов</div>
  //                   <div>3</div>
  //                   <div>2, 4, 9, 14, 16, 19, 57, 63, 93, 95</div>
  //                   <div>200 EGT фриспинов</div>
  //                   <div>4</div>
  //                   <div>8, 10, 11, 13, 30, 33, 39, 44, 56, 58, 61</div>
  //                   <div>100 EGT фриспинов</div>
  //                   <div>5</div>
  //                   <div>21, 23, 26, 27, 28, 29, 31, 36, 37, 38, 41, 42, 43, 49, 53, 72</div>
  //                   <div>50 EGT фриспинов</div>
  //                   <div>6</div>
  //                   <div>1, 7, 12, 17, 22, 64, 70, 73, 75, 77, 78, 80, 81, 85, 87, 88, 91, 96, 98</div>
  //                   <div>30 EGT фриспинов</div>
  //                   <div>7</div>
  //                   <div>3, 6, 24, 25, 32, 34, 40, 45, 46, 47, 48, 51, 52, 59, 60, 62, 65, 66, 67, 68, 69, 71, 74, 76, 79, 82, 83, 84, 86, 89, 90, 92, 94, 97, 99</div>
  //                   <div>10 EGT фриспинов</div>
  //                 </div>
  //                 <p class="answer">Например: если ты будешь 2-м по счету, ты попадешь в 3-ю категорию и получишь 200 EGT фриспинов, Если номер вращении будет 97-й по счету, ты попадешь в 7-ю категорию и получишь соответствующий подарок.<br><br>После каждых 100 спинов очередь начинается снова, 101-й пользователь попадает в ту же категорию, в которой первый, а 102-й попадает в ту же категорию, в которой второй.</p>`,
  //     },
  //   },
  //   {
  //     en: {
  //       question: 'WHAT SHOULD I KNOW ABOUT PRIZES?',
  //       answer: ` <p class="answer">On the first wheel you can win the following prizes: 500 EGT freespins, 200 EGT
  //                   freespins, 100 EGT freespins, 50 EGT freespins, 30 EGT freespins, 10 EGT freespins, a key of golden
  //                   wheel;<br><br>On the second (golden) wheel you can win the following prizes: 1 000 EGT freespins, 500
  //                   EGT freespins, 200 EGT freespins, 100 EGT freespins, 50 EGT freespins, 30 EGT freespins, 10 EGT
  //                   freespins;<br><br>EGT freespins will be credited instantly;<br><br>1 EGT freespin won on the first
  //                   wheel = 0.15₾, which will be credited in slots Zodiac Wheel;<br><br>1 EGT freespin won on the second
  //                   (golden) wheel = 1₾, which will be credited in slots 20 Dazzling Hot;<br><br>Freespins can be used
  //                   within 72 hours after credited;</p>`,
  //     },
  //     ge: {
  //       question: 'რა უნდა ვიცოდე პრიზებზე?',
  //       answer: `<p class="answer">პირველ ბორბალზე შეგიძლია მოიგო შემდეგი პრიზები: 500 EGT ფრისპინი, 200 EGT ფრისპინი,
  //                   100 EGT ფრისპინი, 50 EGT ფრისპინი, 30 EGT ფრისპინი, 10 EGT ფრისპინი, ოქროს ბორბლის
  //                   გასაღები;<br><br>მეორე (ოქროს) ბორბალზე შეგიძლია მოიგო შემდეგი პრიზები: 1 000 EGT ფრისპინი, 500 EGT
  //                   ფრისპინი, 200 EGT ფრისპინი, 100 EGT ფრისპინი, 50 EGT ფრისპინი, 30 EGT ფრისპინი, 10 EGT
  //                   ფრისპინი;<br><br>EGT ფრისპინები დაირიცხება მომენტალურად;<br><br>პირველ ბორბალზე მოგებული 1 EGT
  //                   ფრისპინი = 0.15₾, რომელიც დაირიცხება სლოტში Zodiac Wheel;<br><br>მეორე (ოქროს) ბორბალზე მოგებული 1 EGT
  //                   ფრისპინი = 1₾, რომელიც დაირიცხება სლოტში 20 Dazzling Hot;<br><br>*ფრისპინების გამოყენება შესაძლებელია
  //                   დარიცხვიდან 72 საათის განმავლობაში;</p>`,
  //     },
  //     ru: {
  //       question: 'ЧТО МНЕ НУЖНО ЗНАТЬ О ПРИЗАХ?',
  //       answer: `<p class="answer">В случае вращения первого колеса у тебя есть возможность выиграть следующие призы:
  //                     500 EGT фриспинов, 200 EGT фриспинов, 100 EGT фриспинов, 50 EGT фриспинов, 30₾ фриспинов, 10₾ фриспинов,
  //                     ключ золотого колеса;<br><br>В случае вращения второго (золотого) колеса у тебя есть возможность выиграть
  //                     следующие призы: 1 000 EGT фриспинов, 500 EGT фриспинов, 200 EGT фриспинов, 100 EGT фриспинов, 50 EGT фриспинов,
  //                     30 EGT фриспинов, 10 EGT фриспинов;<br><br>EGT фриспины будут начислены моментально;<br><br>1 выигранный фриспин на
  //                     первом колесе 1 EGT = 0.15₾, который будут зачислен в слоте 100 Zodiac Wheel;<br><br>1 выигранный фриспин на втором
  //                     (золотого) колесе 1 EGT = 1₾, который будут зачислен в слоте 100 Burning Hot;<br><br>Фриспины можно использовать в
  //                     течение 72 часов с момента начисления;</p>`,
  //     },
  //   },
  // ];

  // additionalRules: Rule = {
  //   en: {
  //     question: 'ADDITIONAL RULES:',
  //     answer: `
  //             <ul role="list" class="list">
  //               <li class="list-item">The promotion is valid only for ID-verified users;</li>
  //               <li class="list-item">According to the general rules of Crocobet, opening and using more than one account
  //                 is prohibited. Any player who uses more than one account or participates multiple times from one IP
  //                 address without notice will be removed from the promotion;</li>
  //               <li class="list-item">In case of detecting dishonest actions, or if promotion’s requirements do not meet,
  //                 crocobet.com is authorized to cancel prizes and bonuses of promotion;</li>
  //               <li class="list-item">Crocobet.com reserves the right to modify, cancel or terminate the terms for this
  //                 promotion at any time and without further notice;</li>
  //             </ul>`,
  //   },
  //   ge: {
  //     question: 'დამატებითი წესები:',
  //     answer: `
  //             <ul role="list" class="list">
  //               <li class="list-item">აქცია მოქმედებს ID ვერიფიცირებული მომხმარებლებისთვის.</li>
  //               <li class="list-item">კროკობეთის ზოგადი წესების თანახმად, ერთზე მეტი ანგარიშის გახსნა და გამოყენება
  //                 აკრძალულია. ნებისმიერი მოთამაშე, რომელიც გამოიყენებს ერთზე მეტ ანგარიშს ან რამდენიმეჯერ მიიღებს
  //                 მონაწილეობას ერთი IP მისამართიდან, ავტომატურად მოიხსნება აქციიდან;</li>
  //               <li class="list-item">არაკეთილსინდისიერ ქმედებაში შემჩნეული მოთამაშე ავტომატურად მოიხსნება აქციიდან და არ
  //                 დაერიცხება/ჩამოეჭრება საჩუქარი გაფრთხილებისა და ყოველგვარი ახსნა-განმარტების გარეშე;</li>
  //               <li class="list-item">კროკობეთი იტოვებს უფლებას შეიტანოს ნებისმიერი სახის ცვლილებები აქციის წესებში ან/და
  //                 გააუქმოს აქცია ნებისმიერ ეტაპზე მოთამაშეების წინასწარი ინფორმირების გარეშე;</li>
  //             </ul>`,
  //   },
  //   ru: {
  //     question: 'ДОПОЛНИТЕЛЬНЫЕ ПРАВИЛА:',
  //     answer: `
  //        <ul role="list" class="list">
  //               <li class="list-item">Акция действует для пользователей с подтвержденным ID;</li>
  //               <li class="list-item">Согласно общим правилам Crocobet, открытие и использование более одного счета
  //                 запрещено. Любой игрок, который использует более одной учетной записи или участвует несколько раз с
  //                 одного IP-адреса, будет исключен из акции без предварительного уведомления;</li>
  //               <li class="list-item">Игрок, замеченный в недобросовестном действии, будет автоматически исключен из
  //                 акции, а подарок не будет начислен / списан без предупреждения и без каких-либо объяснений;</li>
  //               <li class="list-item">Crocobet оставляет за собой право вносить любые изменения в правила акции и / или
  //                 отменять акцию на любом этапе без предварительного уведомления игроков.</li>
  //             </ul>`,
  //   },
  // };

  // getRules(): Rule[] {
  //   return this.rules;
  // }

  // getAdditionRules() {
  //   return this.additionalRules;
  // }

  getTitle() {
    return this.title;
  }
}

// {
//   en : {
//     question : '',
//       answer : ''
//   },
//   ge : {
//     question : '',
//       answer : ''
//   },
//   ru: {
//     question : '',
//       answer : ''
//   }
// },
