# VCis
Virtual Crypto Investment Simulation

Project : Virtual Crypto Investment Simulation Site
브이씨이즈 : VCIS (Virtual Crypto Investment Simulation) => VC is
 <실제 암호화폐 시장의 데이터를 UPBIT API로 받아와 가상자산을 사용하여 모의 투자 (Simulation)를 실행하는 웹 사이트 설계>

userTarget : 
암호화폐 지갑 생성 및 거래가 불가한 미성년자
실제 자산으로 암호화폐 투자를 하기 전 시뮬레이션을 원하는 유저
( 실시간 암호화폐 금액을 조회하고자 하는 유저 )
implementationLanguage : ⁠Node.js HTML CSS (C++) (Python) (JAVA) 

overallDetails :
회원가입 및 로그인 절차 간소화 : 다른 암호화폐 모의 투자 사이트보다 경쟁력을 갖추기 위해 단순 ID-PW 방식 접근
업비트 API(Application Programming Interface) 사용 : 유저 타겟은 대한민국 국적, 원화로 데이터를 import
클라우드 서비스 연결 : 유저 객체 데이터에 저장된 지갑, 투자 내역, 현재 투자 상황 등을 불러오기 및 24시간 구동을 위한 클라우드 서비스 연결 (GKE, GIT, NCLUE ... )

pages :
login-signUp
main /* myPage */
myPage /* wallet, Current Investment Details */ : 현재 보유 총 자산, 투자 내역 등 개인 지갑 내역 조회
todayMoney : 09시 기준 24시간마다 기본 금액 지급 (자동 지급이 아닌 수동 지급으로 → 웹 사이트 방문 횟수 증가)
coins : 코인 목록 조회 및 차트 제공. 레버리지+매매 제공 // coinsDetails

#1_Login_SignUp
Login_Page : .json 파일 Decryption <- userData기반 certification // Authentication Algorithm : RSA, RC4 etc.
SignUp_Page : .json 파일 Encryption // RSA, RC4 etc.
#2_main_myPage
#3_todayMoney
#4_coins
