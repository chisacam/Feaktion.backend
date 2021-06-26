# Feaktion.backend

1. 패키지 관리는 기본적으로 **yarn**을 사용합니다. yarn 설치는 기존에 nodejs를 설치하셨다면 함께 설치되는 npm을 통해 설치하시면 됩니다. [공식 문서](https://yarnpkg.com/getting-started/install)를 참고해주세요.

2. nodejs 프로젝트는 package.json에서 script 항목에 미리 정의한 명령어를 간단하게 사용할 수 있습니다. 이미 yarn을 설치했다는 가정하에, 이 프로젝트를 clone하고 아래 절차대로 명령어를 실행하면 nodejs 서버를 실행해볼 수 있습니다.

- yarn install(install은 생략가능, yarn만 타이핑해도 무관합니다.)

- yarn start

3. 단, 현재(20210627, 첫 작성일) 기준으로 단순히 테스트만을 위한 기초적인 script만 작성된 상태이므로, 추후 각 script 내용이 수정되거나, 다른 script가 추가될 수 있습니다.

4. docker 셋업까지 완료된 이후에는 yarn start가 단순히 nodejs 서버를 실행하는것이 아닌, docker-compose를 통해 전체 서비스 컨테이너를 실행하는 한번에 형태가 될 예정입니다.(nodejs + pstg + nginx)
