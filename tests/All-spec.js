exports.basePath = "./";
exports.runTests = function() {
  require(exports.basePath + "CollectionTest");
  require(exports.basePath + "FieldDBObjectTest");
  require(exports.basePath + "FieldDBTest");
  require(exports.basePath + "activity/ActivityTest");
  require(exports.basePath + "app/AppTest");
  require(exports.basePath + "audioVideo/AudioVideoRecorderTest");
  require(exports.basePath + "audioVideo/AudioVideosTest");
  require(exports.basePath + "audioVideo/AudioWebServiceTest");
  require(exports.basePath + "authentication/AuthenticationTest");
  require(exports.basePath + "comment/CommentTest");
  require(exports.basePath + "confidentiality_encryption/ConfidentialTest");
  require(exports.basePath + "corpus/CorpusMaskTest");
  require(exports.basePath + "corpus/CorpusTest");
  require(exports.basePath + "corpus/CorpusWebServiceTest");
  require(exports.basePath + "corpus/DatabaseTest");
  require(exports.basePath + "data_list/DataListTest");
  require(exports.basePath + "datum/DatumFieldsTest");
  require(exports.basePath + "datum/DatumMenuTest");
  require(exports.basePath + "datum/DatumMenuViewTest");
  require(exports.basePath + "datum/DatumStatusTest");
  require(exports.basePath + "datum/DatumTagTest");
  require(exports.basePath + "datum/DatumTest");
  require(exports.basePath + "datum/SessionTest");
  require(exports.basePath + "export/ExportTest");
  require(exports.basePath + "glosser/GlosserTest");
  require(exports.basePath + "hotkey/HotKeyTest");
  require(exports.basePath + "image/ImagesTest");
  require(exports.basePath + "import/ImportTest");
  require(exports.basePath + "insert_unicode/InsertUnicodeTest");
  require(exports.basePath + "locales/ContextualizerTest");
  require(exports.basePath + "permission/PermissionTest");
  require(exports.basePath + "search/SearchTest");
  require(exports.basePath + "user/BotTest");
  require(exports.basePath + "user/ConsultantTest");
  require(exports.basePath + "user/TeamTest");
  require(exports.basePath + "user/UserGenericTest");
  require(exports.basePath + "user/UserPreferenceTest");
};
