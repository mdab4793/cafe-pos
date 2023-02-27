const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
  'mongodb+srv://.ykaqqgg.mongodb.net/?retryWrites=true&w=majority',
  function (err, client) {
    //연결되면 할일 및 에러
    if (err) return console.log(err);
    //cafe-pos라는 폴더(db)에 연결좀요
    db = client.db('cafe-pos');
    //나중에 menu 음료 카테고리별로 분류
    // db.collection('menu').insertOne(
    //   { 이름: '카푸치노' },
    //   function (err, result) {
    //     console.log('저장완료');
    //   }
    // );

    //8080포트로 서버열기
    app.listen(8080, function () {
      console.log('listening on 8080');
    });
  }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var cors = require('cors');
app.use(cors());

//이게있어야 특정 폴더의 파일들 전송 가능
app.use(express.static(path.join(__dirname, 'cafe-pos/build')));
//리액트로만든 페이지를 보여줄수있음
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'cafe-pos/build/index.html'));
});
//이미지업로드
let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/zio/Desktop/node/cafe-pos/public/image');
  },
  //https://velog.io/@kimkanghyune/multer-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0
  //이미지 한글 깨짐해결 댓글보기
  filename: function (req, file, cb) {
    cb(
      null,
      (file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf8'
      ))
    );
  },
});
var upload = multer({ storage: storage });

// //post요청 처리
// //input에 적은 정보는 req에 저장되어있다.
// 커피추가
app.post('/add/coffee', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('coffee').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});

//음료추가
app.post('/add/beverage', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      //resulte.totalPost = 총게시물갯수
      console.log(result.totalPost);
      //totalMenu = 총 게시물갯수
      const totalMenu = result.totalPost;
      //나중에 menu 음료 카테고리별로 분류
      db.collection('beverage').insertOne(
        {
          _id: totalMenu + 1,
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          image: req.file.filename,
          background: req.body.background,
        },

        function (err, result) {
          console.log('저장완료');
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            //$set은 바꿀때사용
            //$inc는 기존값에 더해줄때사용 증가
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      );
    }
  );
});
app.post('/add/tea', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      //resulte.totalPost = 총게시물갯수
      console.log(result.totalPost);
      //totalMenu = 총 게시물갯수
      const totalMenu = result.totalPost;
      //나중에 menu 음료 카테고리별로 분류
      db.collection('tea').insertOne(
        {
          _id: totalMenu + 1,
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          image: req.file.filename,
          background: req.body.background,
        },

        function (err, result) {
          console.log('저장완료');
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            //$set은 바꿀때사용
            //$inc는 기존값에 더해줄때사용 증가
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      );
    }
  );
});
//병음료글추가요청
app.post('/add/bottle', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      //resulte.totalPost = 총게시물갯수
      console.log(result.totalPost);
      //totalMenu = 총 게시물갯수
      const totalMenu = result.totalPost;
      //나중에 menu 음료 카테고리별로 분류
      db.collection('bottle').insertOne(
        {
          _id: totalMenu + 1,
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          image: req.file.filename,
          background: req.body.background,
        },

        function (err, result) {
          console.log('저장완료');
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            //$set은 바꿀때사용
            //$inc는 기존값에 더해줄때사용 증가
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      );
    }
  );
});

//아이스크림글추가요청
app.post('/add/ice', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (err, result) {
      //resulte.totalPost = 총게시물갯수
      console.log(result.totalPost);
      //totalMenu = 총 게시물갯수
      const totalMenu = result.totalPost;
      //나중에 menu 음료 카테고리별로 분류
      db.collection('ice').insertOne(
        {
          _id: totalMenu + 1,
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          image: req.file.filename,
          background: req.body.background,
        },

        function (err, result) {
          console.log('저장완료');
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            //$set은 바꿀때사용
            //$inc는 기존값에 더해줄때사용 증가
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      );
    }
  );
});

// 커피api
app.get('/api/coffee', (req, res) => {
  db.collection('coffee')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
// 음료api
app.get('/api/beverage', (req, res) => {
  db.collection('beverage')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
// 티api
app.get('/api/tea', (req, res) => {
  db.collection('tea')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//병음료api
app.get('/api/bottle', (req, res) => {
  db.collection('bottle')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});

//아이스크림api
app.get('/api/ice', (req, res) => {
  db.collection('ice')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
// ---------------------------------------
//커피수정하기;
app.put('/edit/coffee', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('coffee').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//음료수정하기
app.put('/edit/beverage', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('beverage').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send('<script>history.go(-2);</script>');
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//tea수정하기;
app.put('/edit/tea', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('tea').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});

//bottle수정하기
app.put('/edit/bottle', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('bottle').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send('<script>history.go(-2);</script>');
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//아이스크림수정하기
app.put('/edit/ice', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('ice').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send('<script>history.go(-2);</script>');
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
app.get('/image/:imageName', function (req, res) {
  res.sendFile(__dirname + '/public/image/' + req.params.imageName);
});

//커피삭제
app.delete('/delete/coffee', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('coffee').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
//음료삭제
app.delete('/delete/beverage', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('beverage').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
//티삭제
app.delete('/delete/tea', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('tea').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
//병음료삭제
app.delete('/delete/bottle', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('bottle').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
//아이스크림삭제음료삭제
app.delete('/delete/ice', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('ice').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});

// 빙수추가
app.post('/add/sherbet', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('sherbet').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//빙수api
app.get('/api/sherbet', (req, res) => {
  db.collection('sherbet')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//빙수수정하기;
app.put('/edit/sherbet', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('sherbet').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//빙수삭제
app.delete('/delete/sherbet', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('sherbet').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
// 조각케이크추가
app.post('/add/piece', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('piece').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//조각케이크api
app.get('/api/piece', (req, res) => {
  db.collection('piece')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
// 케이크추가
app.post('/add/cake', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('cake').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//케이크api
app.get('/api/cake', (req, res) => {
  db.collection('cake')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//케이크수정하기;
app.put('/edit/cake', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('cake').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//케이크삭제음료삭제
app.delete('/delete/cake', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('cake').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
//조각케이크수정하기;
app.put('/edit/piece', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('piece').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//조각케이크삭제음료삭제
app.delete('/delete/piece', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('piece').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});

// 디저트추가
app.post('/add/dessert', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('dessert').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//디저트api
app.get('/api/dessert', (req, res) => {
  db.collection('dessert')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//디저트수정하기;
app.put('/edit/dessert', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('dessert').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//디저트삭제
app.delete('/delete/dessert', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('dessert').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});

// sandwich추가
app.post('/add/sandwich', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('sandwich').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//sandwich api
app.get('/api/sandwich', (req, res) => {
  db.collection('sandwich')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//sandwich수정하기;
app.put('/edit/sandwich', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('sandwich').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//sandwich삭제
app.delete('/delete/sandwich', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('sandwich').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});

// lunchset추가
app.post('/add/lunchset', upload.single('image'), function (req, res) {
  res.send("<script>location.href='http://localhost:3000/menu';</script>");
  //req.body라고 하면 요청했던 form에 적힌 데이터 수신가능
  console.log(req.body);
  console.log(req.body.background),
    db
      .collection('counter')
      .findOne({ name: '게시물갯수' }, function (err, result) {
        //resulte.totalPost = 총게시물갯수
        console.log(result.totalPost);
        //totalMenu = 총 게시물갯수
        const totalMenu = result.totalPost;
        //나중에 menu 음료 카테고리별로 분류
        db.collection('lunchset').insertOne(
          {
            _id: totalMenu + 1,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            background: req.body.background,
          },
          function (err, result) {
            console.log('저장완료');
            db.collection('counter').updateOne(
              { name: '게시물갯수' },
              //$set은 바꿀때사용
              //$inc는 기존값에 더해줄때사용 증가
              { $inc: { totalPost: 1 } },
              function (err, result) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        );
      });
});
//lunchset api
app.get('/api/lunchset', (req, res) => {
  db.collection('lunchset')
    .find()
    .toArray(function (err, result) {
      // console.log(result);
      res.json({ menu: result });
    });
});
//lunchset수정하기;
app.put('/edit/lunchset', upload.single('image'), function (req, res) {
  //updateOne은 하나만업데이트시킬때 사용 왼쪽 중괄호는 안에있는걸 찾아주세요.
  //  오른쪽 중괄호는 명령준대로 바꾸게된다.$set 업데이트해주세요,없으면 추가해주세요.라는뜻
  db.collection('lunchset').updateOne(
    //body뒤의id 와title은 html안의 name이다.
    { _id: parseInt(req.body.id) },
    //https://codingapple.com/forums/topic/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9D%91%EC%9A%A9-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    //이미지 해결

    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
        background: req.body.background,
      },
    },
    function (err, result) {
      //완료알럿후 menupopup으로 돌아가기
      res.send(
        // alert('수정완료.');
        '<script>history.go(-2);</script>'
      );
      res.sendFile(__dirname + '/menu');
      console.log('수정완료');
      console.log(req.file.fieldname);
    }
  );
});
//lunchset삭제
app.delete('/delete/lunchset', function (req, res) {
  //문자열 숫자형으로 변환
  req.body._id = parseInt(req.body._id);
  db.collection('lunchset').deleteOne(req.body, function (err, result) {
    console.log('삭제완료');
    console.log(req.body);
  });
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'cafe-pos/build/index.html'));
});
