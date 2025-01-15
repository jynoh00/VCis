//login 이후 main Router
// Cookie-Check always
const express = require('express');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');
const USER_COOKIE_KEY = 'USER';

router.get('/', cookieChecker.Check);
router.get('/dailymoney', cookieChecker.Check, (req,res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main',{
        userId: JSON.parse(userCookie).userId,
        money: JSON.parse(userCookie).money,
        template: `
        <h3>매일마다 가상 자산 100만원을 입금해드립니다.</h3>
        <br>
        <button class = "btn">100만원 받기</button><br><br>
        <div class ="info">
            <span style = "font-weight: bold;">"데일리머니는 가상 자산입니다"</span><br><br>
            매일 제공되는 100만원은 투자 학습을 위한 <span style = "font-weight: bold;">가상 자산</span>입니다.<br>실제 돈이 아니므로 실제 금전적 이익이나 손실이 발생하지 않습니다.<br><br>
            하지만 실제 투자를 준비하시는 마음으로 다음 사항을 꼭 기억해주세요.<br><br>
            <li>실제 투자는 원금 손실의 위험이 있습니다.</li>
            <li>본인의 투자 성향과 위험 감수 수준을 파악하세요.</li>
            <li>투자 가능한 금액을 신중히 결정하세요.</li>
            <li>과도한 레버리지나 대출을 통한 투자는 위험할 수 있습니다</li>
            <br>
            이 시뮬레이션을 통해 투자 경험을 쌓고 더 현명한 암호화폐 투자자가 되시길 바랍니다.
        </div>
        `,
    });
});

module.exports = router;