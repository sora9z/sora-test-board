import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  _MainAppState createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  Future<List<Map<String, dynamic>>>? searchResult;

  Future<List<Map<String, dynamic>>> searchAddress(String query) async {
    final url = Uri.parse('http://localhost:3000/address/search?query=$query');
    final response = await http.get(url);
    if (response.statusCode == 200) {
      List<dynamic> jsonResponse = jsonDecode(response.body);
      return jsonResponse.cast<Map<String, dynamic>>();
    } else {
      throw Exception('Failed to load address');
    }
  }

  @override
  Widget build(BuildContext context) {
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
                  controller: controller,
                  decoration: const InputDecoration(
                    hintText: '주소를 입력하세요',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  searchResult = searchAddress(controller.text);
                  (context as Element).markNeedsBuild();
                },
                child: const Text('검색'),
              ),
              Expanded(
                child: FutureBuilder<List<Map<String, dynamic>>>(
                  future: searchResult,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const CircularProgressIndicator();
                    } else if (snapshot.hasError) {
                      return Text('오류: ${snapshot.error}');
                    } else if (snapshot.hasData) {
                      return ListView.builder(
                        itemCount: snapshot.data?.length ?? 0,
                        itemBuilder: (context, index) {
                          var address = snapshot.data![index];
                          return ListTile(
                            title: Text(
                                '${address["originalLandAddress"]} / ${address["originalRoadAddress"]}'),
                            subtitle: Text(
                                '위도: ${address["point"]["latitude"]}, 경도: ${address["point"]["longitude"]}'),
                          );
                        },
                      );
                    } else {
                      return const Text('검색 결과가 없습니다.');
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
