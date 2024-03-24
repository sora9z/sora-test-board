import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    // TextEditingController 인스턴스 생성
    final TextEditingController controller = TextEditingController();

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('주소 검색'),
        ),
        body: Center(
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: controller, // TextField에 controller 설정
                  decoration: const InputDecoration(
                    hintText: '주소를 입력하세요',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  // controller를 사용하여 TextField의 텍스트에 접근
                  final query = controller.text;
                  final url = Uri.parse(
                      'http://localhost:3000/address/search?query=$query');
                  http.get(url).then((response) {
                    if (response.statusCode == 200) {
                      // 성공적으로 데이터를 받아왔을 때의 처리
                      print('검색 결과: ${response.body}');
                    } else {
                      // 서버 오류 처리
                      print('서버 오류: ${response.statusCode}');
                    }
                  }).catchError((error) {
                    // 네트워크 오류 처리
                    print('네트워크 오류: $error');
                  });
                },
                child: const Text('검색'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
