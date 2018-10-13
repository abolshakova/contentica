Файловая структура проекта
==========================

* code    - исходный код проекта
* design  - документы с проектированием по проекту
* doc     - документация по проекту


code
----

* build   - результирующая сборка проекта
* configs - различные конфиги инструментов для разработки
* scripts - различные скрипты для управления проектом (сборка деплой и тд)
* src     - исходные коды проекта


### src

используется компонентная модель

* index.js      - точка входа в приложение
* cli           - обработка взаимодействий с пользователем через консоль (запуск, справка и тд)
* config-parser - обработка конфига приложения
* processors    - дефолтные процессоры (input-processor, data-tree-processor, output-processor)
* data-plugins  - дефолтные дата-плагины (нужны при парсинге информации input-процессором)